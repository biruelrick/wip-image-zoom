!function(){"use strict";function e(){this.defaults={zoomEnable:!0,defaultIndex:0,images:[],style:"inner",boxPos:"right-top",boxW:400,boxH:400,method:"lens",cursor:"crosshair",lens:!0,zoomLevel:3,immersiveMode:"769",immersiveModeOptions:{},immersiveModeMessage:"Click to Zoom",prevThumbButton:"&#9665;",nextThumbButton:"&#9655;",thumbsPos:"bottom",thumbCol:3,thumbColPadding:4},this.setDefaults=function(e){this.defaults=angular.extend(this.defaults,e)},this.$get=function(){return this}}function o(e){return{restrict:"EA",template:'<div class="wip-image-zoom {{vm.options.style}}-style {{vm.options.thumbsPos}}-thumbs"\n     ng-class="{\n     \'active\':vm.zoomActive, \n     \'immersive-mode\':vm.immersiveModeActive && !immersive,\n     \'zoom-disabled\':!vm.options.zoomEnable,\n     \'box-style\':vm.options.style == \'box\' ,\n     \'inner-style\':vm.options.style == \'inner\'}">\n\n    <wip-image-zoom-thumbs ng-if="vm.options.thumbsPos === \'top\' && vm.images.length > 1"></wip-image-zoom-thumbs>\n\n    <div ng-hide="!vm.options.zoomEnable && immersive" class="main-image-wrapper" ng-class="{\'loading\':vm.largeImageLoading}">\n        <div class="image-zoom-tracker" wip-image-zoom-tracker></div>\n        <div class="image-zoom-lens" wip-image-zoom-lens></div>\n        <img class="main-image" ng-src="{{vm.mainImage.medium}}" image-on-load="vm.initZoom()">\n        <div class="zoom-mask"\n             ng-class="vm.options.style == \'box\'? vm.options.boxPos : \'\'"\n             wip-image-zoom-mask>\n            <img wip-image-zoom-image class="zoom-image main-image-large" image-on-load="vm.largeImageLoaded()"\n                 ng-src="{{vm.mainImage.large}}">\n        </div>\n        <div ng-if="vm.immersiveModeActive && !immersive && vm.options.immersiveModeMessage !== \'\'"\n             class="immersive-mode-message" ng-bind="vm.options.immersiveModeMessage"></div>\n    </div>\n\n    <div class="immersive-no-zoom-image-wrapper" ng-show="!vm.options.zoomEnable && immersive">\n        <img class="main-image-large" ng-src="{{vm.mainImage.large}}">\n    </div>\n\n    <wip-image-zoom-thumbs\n            ng-if="vm.options.thumbsPos === \'bottom\' && vm.images.length > 1"></wip-image-zoom-thumbs>\n</div>',replace:!0,scope:{selectedModel:"=?",selectedIndex:"=?",wipImageZoom:"=",immersive:"=?"},controllerAs:"vm",link:function(e,o,t,i){i.el=o,i.attrs=t,i.init()},controller:["$scope","$document","$window","$compile","wipImageZoomConfig",function(o,t,i,m,n){function s(){U.options=o.wipImageZoom?angular.extend(V,o.wipImageZoom):V,a(),o.selectedIndex=U.options.defaultIndex,o.selectedModel=U.mainImage,C()}function a(){U.options.images.length<=0&&(U.options.images=[{thumb:U.attrs.src,medium:U.attrs.src,large:U.attrs.src}]),U.images=U.options.images,U.mainImage=U.images[U.options.defaultIndex]}function l(){_&&e.cancel(_),_=e(function(){c(),r(),E()},400)}function r(){U.options.zoomEnable&&(f(),U.zoomTracker.style.cursor=U.options.cursor,U.options.lens?U.zoomLens.style.display="block":U.zoomLens.style.display="none",p(),U.immersiveModeActive=U.options.immersiveMode&&U.options.immersiveMode>i.innerWidth||"always"===U.options.immersiveMode,U.immersiveModeActive&&!o.immersive&&U.zoomTracker.addEventListener("mousedown",d),(!U.immersiveModeActive||o.immersive)&&u())}function u(){U.zoomTracker.addEventListener("mousemove",k),U.zoomTracker.addEventListener("touchstart",k),U.zoomTracker.addEventListener("mouseleave",L),U.zoomTracker.addEventListener("touchend",L),U.zoomTracker.addEventListener("mousemove",z),U.zoomTracker.addEventListener("touchmove",z)}function p(){U.zoomTracker.removeEventListener("mousedown",d),U.zoomTracker.removeEventListener("mousemove",k),U.zoomTracker.removeEventListener("touchstart",k),U.zoomTracker.removeEventListener("mouseleave",L),U.zoomTracker.removeEventListener("touchend",L),U.zoomTracker.removeEventListener("mousemove",z),U.zoomTracker.removeEventListener("touchmove",z)}function g(){t.find("html").removeClass("wip-image-zoom-immersive-mode-enabled"),p(),U.immersedEl.remove(),l()}function d(e){e.preventDefault(),e.stopPropagation(),o.$apply(function(){t.find("html").addClass("wip-image-zoom-immersive-mode-enabled");var e=t.find("body").eq(0);U.immersedImageOpt=angular.extend(angular.copy(U.options),U.options.immersiveModeOptions),U.immersedImageOpt.defaultIndex=o.selectedIndex,U.immersedImageOpt.style="inner",U.immersedEl=m('<div class="immersive-wip-image-zoom">\n    <div class="disable-immersive-mode-button" ng-click="vm.disableImmersiveMode()">&#10006;</div>\n    <img src="" wip-image-zoom="vm.immersedImageOpt" immersive="true" selected-index="selectedIndex">\n</div>\n')(o),e.append(U.immersedEl),l()})}function c(){U.images.length<=1||(U.thumbsWrapperWidth=U.thumbsWrapper.clientWidth,U.thumbWidth=Math.round((U.thumbsWrapperWidth+U.options.thumbColPadding)/U.options.thumbCol),U.thumbsWidth=U.thumbWidth*U.images.length,U.maxPosX=U.images.length-U.options.thumbCol,o.$evalAsync(function(){"top"===U.options.thumbsPos?(U.thumbsEl.style.paddingBottom=U.options.thumbColPadding+"px",U.thumbsEl.style.paddingTop=0):(U.thumbsEl.style.paddingTop=U.options.thumbColPadding+"px",U.thumbsEl.style.paddingBottom=0);for(var e=0;e<U.thumbsEl.children.length;e++){var o=U.thumbsEl.children[e];o.style.width=U.thumbWidth+"px",o.style.paddingRight=U.options.thumbColPadding+"px"}}))}function v(){b(U.thumbsPos+1)}function h(){b(U.thumbsPos-1)}function b(e){e=0>e?0:e,e=e>U.maxPosX?U.maxPosX:e,U.thumbsPos=e;var o=U.thumbsPos*U.thumbWidth*-1;U.thumbsEl.style.transform="translate3d("+o+"px, 0px, 0)"}function f(){var e=U.zoomTracker.getBoundingClientRect();A=e.width,$=e.height,q=e.left+i.scrollX,D=e.top+i.scrollY,"box"!==U.options.style||o.immersive?(R=A,H=$,U.zoomMaskEl.style.width="100%",U.zoomMaskEl.style.height="100%"):(R=U.options.boxW,H=U.options.boxH,U.zoomMaskEl.style.width=R+"px",U.zoomMaskEl.style.height=H+"px"),U.zoomImageEl.style.width="",U.zoomImageEl.style.height="",U.options.zoomLevel>1?(U.zoomImageEl.style.width=A*U.options.zoomLevel+"px",U.zoomImageEl.style.height=$*U.options.zoomLevel+"px"):(U.zoomImageEl.offsetWidth<=R||U.zoomImageEl.offsetHeight<=H)&&(U.zoomImageEl.offsetWidth/U.zoomImageEl.offsetHeight>1?(U.zoomImageEl.style.height=1.5*H+"px",U.zoomImageEl.style.width=""):(U.zoomImageEl.style.width=1.5*R+"px",U.zoomImageEl.style.height="")),X=U.zoomImageEl.offsetWidth,S=U.zoomImageEl.offsetHeight,w()}function z(e){e.preventDefault();var o="touchmove"===e.type&&e.touches&&e.touches[0];B=o&&o.pageX||e.pageX,W=o&&o.pageY||e.pageY,y(),"lens"===U.options.method?x():I()}function x(){var e=[(X-R+1*N/J)*[F/A]],o=[(S-H+1*Y/J)*[G/$]];U.zoomImageEl.style.transform="translate3d("+-1*e+"px,"+-1*o+"px,0)"}function I(){var e=[(X-R)*[(B-q)/A]],o=[(S-H)*[(W-D)/$]];e=q>B?0:e,o=D>W?0:o,e=B>q+A?X-R:e,o=W>D+$?S-H:o,U.zoomImageEl.style.transform="translate3d("+-1*e+"px,"+-1*o+"px,0)"}function w(){J=A/X,N=R*J,Y=H*J,U.zoomLens.style.width=N+"px",U.zoomLens.style.height=Y+"px"}function y(){F=B-q-.5*N,G=W-D-.5*Y,F=F>A-N?A-N:F,F=0>F?0:F,G=G>$-Y?$-Y:G,G=0>G?0:G,U.zoomLens.style.transform="translate3d("+F+"px,"+G+"px,0)"}function E(){if(!(U.images.length<=1||U.images.length<U.options.thumbCol)){var e=T(),o=U.thumbsPos+U.options.thumbCol>e&&U.thumbsPos<e;return o?void b(U.thumbsPos):void b(e)}}function T(){for(var e=0;e<U.images.length;e++)if(U.images[e].medium===U.mainImage.medium)return e}function k(){o.$evalAsync(function(){U.zoomActive=!0})}function L(){o.$evalAsync(function(){U.zoomActive=!1})}function j(e,o){angular.isDefined(e)&&e!==o&&(U.mainImage=e,E())}function M(e,o){angular.isDefined(e)&&e!==o&&(U.mainImage=U.images[e],E())}function P(e){U.largeImageLoading=!0,U.mainImage=e,Z(),o.selectedModel=angular.copy(U.mainImage),o.selectedIndex=U.images.indexOf(U.mainImage),C()}function C(){K=o.$watch("selectedIndex",M,!0),Q=o.$watch("selectedModel",j,!0)}function Z(){Q(),K()}function O(){U.largeImageLoading=!1,f()}var B,W,A,$,q,D,R,H,X,S,N,Y,F,G,J,K,Q,U=this,V=angular.copy(n.defaults),_=!0;U.el={},U.zoomTracker={},U.zoomLens={},U.zoomImageEl={},U.thumbsWrapper={},U.thumbsEl={},U.mainImage={},U.options={},U.images=[],U.zoomActive=!1,U.largeImageLoading=!0,U.prevThumbActive=!1,U.nextThumbActive=!1,U.thumbWidth=0,U.thumbsWrapperWidth=0,U.thumbsWidth=0,U.thumbsPos=0,U.immersiveModeActive=!1,U.init=s,U.initZoom=r,U.initThumbs=c,U.largeImageLoaded=O,U.updateMainImage=P,U.nextThumb=v,U.prevThumb=h,U.disableImmersiveMode=g,angular.element(window).on("resize",function(){l()}),i.Ps&&angular.element(document).on("ps-scroll-y",function(){f()}),o.$watch(function(){return{left:U.zoomTracker.getBoundingClientRect().left+i.scrollX,top:U.zoomTracker.getBoundingClientRect().top+i.scrollY}},function(e,o){angular.isDefined(e)&&e!==o&&l()},!0),o.$watch("wipImageZoom",function(e,o){angular.isDefined(e)&&e!==o&&(s(),l())},!0)}]}}function t(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomLens=o[0]}}}function i(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomTracker=o[0]}}}function m(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomMaskEl=o[0]}}}function n(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomImageEl=o[0]}}}function s(){return{restrict:"EA",require:"^wipImageZoom",template:'<div class="thumbs-wrapper" ng-swipe-left="vm.nextThumb()" ng-swipe-right="vm.prevThumb()">\n    <div class="thumbs" >\n        <div class="thumb-wrapper" ng-repeat="image in vm.images">\n            <img ng-src="{{image.thumb}}" ng-click="vm.updateMainImage(image)"\n                 ng-class="{\'selected\': vm.mainImage.thumb === image.thumb}">\n        </div>\n    </div>\n</div>\n<div class="prev-button"\n     ng-if="vm.thumbsPos !== 0 && vm.images.length > vm.options.thumbCol"\n     ng-click="vm.prevThumb()"\n     ng-bind-html="vm.options.prevThumbButton">Prev\n</div>\n<div class="next-button"\n     ng-if="vm.thumbsPos !== vm.maxPosX && vm.images.length > vm.options.thumbCol"\n     ng-click="vm.nextThumb()"\n     ng-bind-html="vm.options.nextThumbButton">Next\n</div>',link:function(e,o,t,i){i.thumbsWrapper=o[0].getElementsByClassName("thumbs-wrapper")[0],i.thumbsEl=o[0].getElementsByClassName("thumbs")[0],i.initThumbs()}}}function a(e){return{restrict:"A",link:function(o,t,i){t[0].addEventListener("load",function(){o.$apply(i.imageOnLoad)},!1),t[0].addEventListener("error",function(){e.warn("image could not be loaded")})}}}a.$inject=["$log"],o.$inject=["$timeout"],angular.module("wipImageZoom",["ngSanitize","ngTouch"]).provider("wipImageZoomConfig",e).directive("imageOnLoad",a).directive("wipImageZoom",o).directive("wipImageZoomTracker",i).directive("wipImageZoomLens",t).directive("wipImageZoomMask",m).directive("wipImageZoomImage",n).directive("wipImageZoomThumbs",s)}(),function(){"use strict";function e(){var e=this;e.zoomOptions1={defaultImage:0,style:"box",boxPos:"right-top",boxW:400,boxH:400,method:"lens",cursor:"crosshair",lens:!0,zoomLevel:3,immersiveMode:"769",immersiveModeOptions:{},prevThumbButton:"&#9665;",nextThumbButton:"&#9655;",thumbsPos:"bottom",thumbCol:4,thumbColPadding:4,images:[{thumb:"assets/images/1-thumb.jpg",medium:"assets/images/1-medium.jpg",large:"assets/images/1-large.jpg"},{thumb:"assets/images/2-thumb.jpg",medium:"assets/images/2-medium.jpg",large:"assets/images/2-large.jpg"},{thumb:"assets/images/3-thumb.jpg",medium:"assets/images/3-medium.jpg",large:"assets/images/3-large.jpg"},{thumb:"assets/images/4-thumb.jpg",medium:"assets/images/4-medium.jpg",large:"assets/images/4-large.jpg"},{thumb:"assets/images/5-thumb.jpg",medium:"assets/images/5-medium.jpg",large:"assets/images/5-large.jpg"},{thumb:"assets/images/6-thumb.jpg",medium:"assets/images/6-medium.jpg",large:"assets/images/6-large.jpg"},{thumb:"assets/images/7-thumb.jpg",medium:"assets/images/7-medium.jpg",large:"assets/images/7-large.jpg"}]}}angular.module("wipImageZoom").controller("MainController",e)}(),function(){"use strict";angular.module("wipImageZoomDemo",["wipImageZoom"])}(),function(){"use strict";function e(){}angular.module("wipImageZoomDemo").run(e)}(),function(){"use strict";function e(e){e.setDefaults({})}e.$inject=["wipImageZoomConfigProvider"],angular.module("wipImageZoomDemo").config(e)}(),angular.module("wipImageZoom").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class=container><h1 class=page-title>wip-image-zoom</h1><div class=demo-preview><img src=assets/images/1-medium.jpg wip-image-zoom=vm.zoomOptions1 selected-model=vm.selected selected-index=vm.selectedIndex><!--  <div style="width:300px">\n              <img src="http://lorempixel.com/output/nature-h-c-100-200-9.jpg" wip-image-zoom=\'{\n                 "images"              : [\n                  {\n                      thumb : "http://lorempixel.com/output/nature-h-c-100-200-9.jpg",\n                      medium: "http://lorempixel.com/output/nature-h-c-100-200-9.jpg",\n                      large : "http://lorempixel.com/output/nature-h-c-200-400-9.jpg"\n                  },\n                  {\n                      thumb : "http://lorempixel.com/output/nature-h-c-100-150-5.jpg",\n                      medium: "http://lorempixel.com/output/nature-h-c-100-150-5.jpg",\n                      large : "http://lorempixel.com/output/nature-h-c-600-900-5.jpg"\n                  },\n                  {\n                      thumb : "http://lorempixel.com/output/nature-q-c-200-100-6.jpg",\n                      medium: "http://lorempixel.com/output/nature-q-c-200-100-6.jpg",\n                      large : "http://lorempixel.com/output/nature-q-c-400-200-6.jpg"\n                  },\n                  {\n                      thumb : "http://lorempixel.com/output/nature-q-c-200-100-6.jpg",\n                      medium: "http://lorempixel.com/output/nature-q-c-400-200-6.jpg",\n                      large : "http://lorempixel.com/output/nature-q-c-300-200-6.jpg"\n                  },\n                  {\n                      thumb : "http://lorempixel.com/output/nature-q-c-200-200-3.jpg",\n                      medium: "http://lorempixel.com/output/nature-q-c-200-200-3.jpg",\n                      large : "http://lorempixel.com/output/nature-q-c-400-400-3.jpg"\n                  }\n                  ]\n              }\'>\n          </div>\n          --></div><section><div class=demo-settings><button ng-repeat="image in vm.zoomOptions1.images" ng-click="vm.selected = image">Image {{$index +1 }}</button><div class=setting><label>Style:</label><select ng-model=vm.zoomOptions1.style><option value=box>Box</option><option value=inner>Inner</option></select></div><div class=setting><label>Box Style Position:</label><select ng-model=vm.zoomOptions1.boxPos><option value=right-top>Right Top</option><option value=right-middle>Right Middle</option><option value=right-bottom>Right Bottom</option><option value=left-top>Left Top</option><option value=left-middle>Left Middle</option><option value=left-bottom>Left Bottom</option><option value=bottom-left>Bottom Left</option><option value=bottom-center>Bottom Center</option><option value=bottom-right>Bottom Right</option><option value=top-left>Top Left</option><option value=top-center>Top Center</option><option value=top-right>Top Right</option></select></div><div class=setting><label>Box Width:</label><input ng-model=vm.zoomOptions1.boxW type=number step=1 min=0></div><div class=setting><label>Box Height:</label><input ng-model=vm.zoomOptions1.boxH type=number step=1 min=0></div><div class=setting><label>Method:</label><select ng-model=vm.zoomOptions1.method><option value=lens>Lens</option><option value=pointer>Pointer</option></select></div><div class=setting><label>Cursor:</label><select ng-model=vm.zoomOptions1.cursor><option value=default>Default</option><option value=pointer>Pointer</option><option value=crosshair>Crosshair</option><option value=move>Move</option><option value=zoom-in>Zoom in</option><option value=none>None</option></select></div><div class=setting><label>Show Lens:</label><input ng-model=vm.zoomOptions1.lens type=checkbox></div><div class=setting><label>Zoom Level:</label><input ng-model=vm.zoomOptions1.zoomLevel type=number step=.5 min=0></div><div class=setting><label>Immersive Mode:</label><input ng-model=vm.zoomOptions1.immersiveMode><div class=detail>false or 0 for disable, max width(px) for trigger</div></div><div class=setting><label>Thumbs Position:</label><select ng-model=vm.zoomOptions1.thumbsPos><option value=top>top</option><option value=bottom>bottom</option></select></div><div class=setting><label>Previous Thumb Button:</label><input ng-model=vm.zoomOptions1.prevThumbButton type=text></div><div class=setting><label>Next Thumb Button:</label><input ng-model=vm.zoomOptions1.nextThumbButton type=text></div><div class=setting><label>Thumb Column Count:</label><input ng-model=vm.zoomOptions1.thumbCol type=number step=1 min=1></div><div class=setting><label>Thumb Column Padding (px):</label><input ng-model=vm.zoomOptions1.thumbColPadding type=number step=1 min=0></div></div><div class=demo-json><h4>Options</h4><pre>{{vm.zoomOptions1 | json}}</pre><h4>Selected Model</h4><pre>{{vm.selected | json}}</pre><h4>SelectedIndex</h4><pre>{{vm.selectedIndex}}</pre></div></section></div>')}]);
//# sourceMappingURL=../maps/scripts/app.js.map
