/**
 * angular-onlyoffie
 * https://github.com/legalthings/angular-onlyoffice
 * Copyright (c) 2015 ; Licensed MIT
 */
angular.module('onlyoffice', []);

angular.module('onlyoffice').directive('onlyofficeEditor', [function () {
  function key(k) {
    var result = k.replace(new RegExp("[^0-9-.a-zA-Z_=]", "g"), "_") + (new Date()).getTime();
    return result.substring(result.length - Math.min(result.length, 50));
  }

  var getDocumentType = function (ext) {
    if (".docx.doc.odt.rtf.txt.html.htm.mht.pdf.djvu.fb2.epub.xps".indexOf(ext) != -1) return "text";
    if (".xls.xlsx.ods.csv".indexOf(ext) != -1) return "spreadsheet";
    if (".pps.ppsx.ppt.pptx.odp".indexOf(ext) != -1) return "presentation";
    return null;
  };

  return {
    template: '<div id="onlyoffice-editor"></div>',
    scope: {
      save: '&'
    },
    link: function ($scope, $element, $attrs) {
      $scope.$watch(function () {
        return $attrs.src;
      }, function () {
        if (!$attrs.src) return;
        var docUrl = $attrs.src;

        var docTitle = $attrs.title || docUrl;
        var docKey = key(docUrl);

        var docType = docUrl.split('?')[0].substring(docUrl.lastIndexOf(".") + 1).trim().toLowerCase();
        var documentType = getDocumentType(docType);

        var config = {
          type: "desktop",
          width: '100%',
          height: '100%',
          documentType: documentType,
          document: {
            title: docTitle,
            url: docUrl,
            fileType: docType,
            key: docKey,
            permissions: {
              edit: true,
              download: false
            }
          },
          editorConfig: {
            mode: 'edit'
          },
          events: {
            onReady: function () {
              setTimeout(function () {
                $scope.$apply(function () {
                  $scope.ready = true;
                });
              }, 5000);
            },
            onSave: function (event) {
              var url = event.data;
              $scope.save({url: url, close: $scope.close});
            }
          }
        };

        //creating object editing
        new DocsAPI.DocEditor("onlyoffice-editor", config);
      });
    },
    controller: ['$scope', function ($scope) {
      $scope.saveClose = function () {
        $scope.close = true;
        var window = angular.element('iframe')[0].contentWindow;
        window.postMessage({command: 'save'}, '*');
      };

      $scope.$on('onlyofficeSaveClose', $scope.saveClose);
    }]
  }
}]);

