/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module( 'ui.bootstrap.tooltip', [ 'ui.bootstrap.position', 'ui.bootstrap.bindHtml' ] )

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
    .provider( '$tooltip', function () {
        // The default options tooltip and popover.
        var defaultOptions = {
            placement: 'top',
            animation: true,
            popupDelay: 0
        };

        // Default hide triggers for each show trigger
        var triggerMap = {
            'mouseenter': 'mouseleave',
            'click': 'click',
            'focus': 'blur'
        };

        // The options specified to the provider globally.
        var globalOptions = {};

        /**
         * `options({})` allows global configuration of all tooltips in the
         * application.
         *
         *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
         */
        this.options = function( value ) {
            angular.extend( globalOptions, value );
        };

        /**
         * This allows you to extend the set of trigger mappings available. E.g.:
         *
         *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
         */
        this.setTriggers = function setTriggers ( triggers ) {
            angular.extend( triggerMap, triggers );
        };

        /**
         * This is a helper function for translating camel-case to snake-case.
         */
        function snake_case(name){
            var regexp = /[A-Z]/g;
            var separator = '-';
            return name.replace(regexp, function(letter, pos) {
                return (pos ? separator : '') + letter.toLowerCase();
            });
        }

        /**
         * Returns the actual instance of the $tooltip service.
         * TODO support multiple triggers
         */
        this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', '$position', '$interpolate', function ( $window, $compile, $timeout, $parse, $document, $position, $interpolate ) {
            return function $tooltip ( type, prefix, defaultTriggerShow ) {
                var options = angular.extend( {}, defaultOptions, globalOptions );

                /**
                 * Returns an object of show and hide triggers.
                 *
                 * If a trigger is supplied,
                 * it is used to show the tooltip; otherwise, it will use the `trigger`
                 * option passed to the `$tooltipProvider.options` method; else it will
                 * default to the trigger supplied to this directive factory.
                 *
                 * The hide trigger is based on the show trigger. If the `trigger` option
                 * was passed to the `$tooltipProvider.options` method, it will use the
                 * mapped trigger from `triggerMap` or the passed trigger if the map is
                 * undefined; otherwise, it uses the `triggerMap` value of the show
                 * trigger; else it will just use the show trigger.
                 */
                function getTriggers ( trigger ) {
                    var show = trigger || options.trigger || defaultTriggerShow;
                    var hide = triggerMap[show] || show;
                    return {
                        show: show,
                        hide: hide
                    };
                }

                var directiveName = snake_case( type );

                var startSym = $interpolate.startSymbol();
                var endSym = $interpolate.endSymbol();
                var template =
                    '<div '+ directiveName +'-popup '+
                    'title="'+startSym+'tt_title'+endSym+'" '+
                    'content="'+startSym+'tt_content'+endSym+'" '+
                    'placement="'+startSym+'tt_placement'+endSym+'" '+
                    'animation="tt_animation" '+
                    'is-open="tt_isOpen"'+
                    '>'+
                    '</div>';

                return {
                    restrict: 'EA',
                    scope: true,
                    compile: function (tElem, tAttrs) {
                        var tooltipLinker = $compile( template );

                        return function link ( scope, element, attrs ) {
                            var tooltip;
                            var transitionTimeout;
                            var popupTimeout;
                            var appendToBody = angular.isDefined( options.appendToBody ) ? options.appendToBody : false;
                            var triggers = getTriggers( undefined );
                            var hasEnableExp = angular.isDefined(attrs[prefix+'Enable']);

                            var positionTooltip = function () {

                                var ttPosition = $position.positionElements(element, tooltip, scope.tt_placement, appendToBody);
                                ttPosition.top += 'px';
                                ttPosition.left += 'px';

                                // Now set the calculated positioning.
                                tooltip.css( ttPosition );
                            };

                            // By default, the tooltip is not open.
                            // TODO add ability to start tooltip opened
                            scope.tt_isOpen = false;

                            function toggleTooltipBind () {
                                if ( ! scope.tt_isOpen ) {
                                    showTooltipBind();
                                } else {
                                    hideTooltipBind();
                                }
                            }

                            // Show the tooltip with delay if specified, otherwise show it immediately
                            function showTooltipBind() {
                                if(hasEnableExp && !scope.$eval(attrs[prefix+'Enable'])) {
                                    return;
                                }
                                if ( scope.tt_popupDelay ) {
                                    // Do nothing if the tooltip was already scheduled to pop-up.
                                    // This happens if show is triggered multiple times before any hide is triggered.
                                    if (!popupTimeout) {
                                        popupTimeout = $timeout( show, scope.tt_popupDelay, false );
                                        popupTimeout.then(function(reposition){reposition();});
                                    }
                                } else {
                                    show()();
                                }
                            }

                            function hideTooltipBind () {
                                scope.$apply(function () {
                                    hide();
                                });
                            }

                            // Show the tooltip popup element.
                            function show() {

                                popupTimeout = null;

                                // If there is a pending remove transition, we must cancel it, lest the
                                // tooltip be mysteriously removed.
                                if ( transitionTimeout ) {
                                    $timeout.cancel( transitionTimeout );
                                    transitionTimeout = null;
                                }

                                // Don't show empty tooltips.
                                if ( ! scope.tt_content ) {
                                    return angular.noop;
                                }

                                createTooltip();

                                // Set the initial positioning.
                                tooltip.css({ top: 0, left: 0, display: 'block' });

                                // Now we add it to the DOM because need some info about it. But it's not
                                // visible yet anyway.
                                if ( appendToBody ) {
                                    $document.find( 'body' ).append( tooltip );
                                } else {
                                    element.after( tooltip );
                                }

                                positionTooltip();

                                // And show the tooltip.
                                scope.tt_isOpen = true;
                                scope.$digest(); // digest required as $apply is not called

                                // Return positioning function as promise callback for correct
                                // positioning after draw.
                                return positionTooltip;
                            }

                            // Hide the tooltip popup element.
                            function hide() {
                                // First things first: we don't show it anymore.
                                scope.tt_isOpen = false;

                                //if tooltip is going to be shown after delay, we must cancel this
                                $timeout.cancel( popupTimeout );
                                popupTimeout = null;

                                // And now we remove it from the DOM. However, if we have animation, we
                                // need to wait for it to expire beforehand.
                                // FIXME: this is a placeholder for a port of the transitions library.
                                if ( scope.tt_animation ) {
                                    if (!transitionTimeout) {
                                        transitionTimeout = $timeout(removeTooltip, 500);
                                    }
                                } else {
                                    removeTooltip();
                                }
                            }

                            function createTooltip() {
                                // There can only be one tooltip element per directive shown at once.
                                if (tooltip) {
                                    removeTooltip();
                                }
                                tooltip = tooltipLinker(scope, function () {});

                                // Get contents rendered into the tooltip
                                scope.$digest();
                            }

                            function removeTooltip() {
                                transitionTimeout = null;
                                if (tooltip) {
                                    tooltip.remove();
                                    tooltip = null;
                                }
                            }

                            /**
                             * Observe the relevant attributes.
                             */
                            attrs.$observe( type, function ( val ) {
                                scope.tt_content = val;

                                if (!val && scope.tt_isOpen ) {
                                    hide();
                                }
                            });

                            attrs.$observe( prefix+'Title', function ( val ) {
                                scope.tt_title = val;
                            });

                            attrs.$observe( prefix+'Placement', function ( val ) {
                                scope.tt_placement = angular.isDefined( val ) ? val : options.placement;
                            });

                            attrs.$observe( prefix+'PopupDelay', function ( val ) {
                                var delay = parseInt( val, 10 );
                                scope.tt_popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
                            });

                            var unregisterTriggers = function () {
                                element.unbind(triggers.show, showTooltipBind);
                                element.unbind(triggers.hide, hideTooltipBind);
                            };

                            attrs.$observe( prefix+'Trigger', function ( val ) {
                                unregisterTriggers();

                                triggers = getTriggers( val );

                                if ( triggers.show === triggers.hide ) {
                                    element.bind( triggers.show, toggleTooltipBind );
                                } else {
                                    element.bind( triggers.show, showTooltipBind );
                                    element.bind( triggers.hide, hideTooltipBind );
                                }
                            });

                            var animation = scope.$eval(attrs[prefix + 'Animation']);
                            scope.tt_animation = angular.isDefined(animation) ? !!animation : options.animation;

                            attrs.$observe( prefix+'AppendToBody', function ( val ) {
                                appendToBody = angular.isDefined( val ) ? $parse( val )( scope ) : appendToBody;
                            });

                            // if a tooltip is attached to <body> we need to remove it on
                            // location change as its parent scope will probably not be destroyed
                            // by the change.
                            if ( appendToBody ) {
                                scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {
                                    if ( scope.tt_isOpen ) {
                                        hide();
                                    }
                                });
                            }

                            // Make sure tooltip is destroyed and removed.
                            scope.$on('$destroy', function onDestroyTooltip() {
                                $timeout.cancel( transitionTimeout );
                                $timeout.cancel( popupTimeout );
                                unregisterTriggers();
                                removeTooltip();
                            });
                        };
                    }
                };
            };
        }];
    })

    .directive( 'tooltipPopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
            templateUrl: 'views/tooltip.html'
        };
    })

    .directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );
    }])

    .directive( 'tooltipHtmlUnsafePopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
            templateUrl: 'views/tooltip.html'
        };
    })

    .directive( 'tooltipHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );
    }]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tooltip/tooltip-popup.html",
            "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
            "  <div class=\"tooltip-arrow\"></div>\n" +
            "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
            "</div>\n" +
            "");
}]);