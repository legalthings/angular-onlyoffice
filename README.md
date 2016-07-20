> ## This project is no longer being maintained. Feel free to fork and use it. Any issue you find, you'll need to fix yourself.

# ONLYOFFICE Angular directive

Embed [ONLYOFFICE](https://www.onlyoffice.com/) into your angular application.

## Installation

    bower install angular-onlyoffice --save

## Usage

```html
<html>
  <head>
    <script type="text/javascript" src="vendor/angular/angular.js"></script>
    <script type="text/javascript" src="vendor/angular-onlyoffice/src/onlyoffice-editor.js"></script>
    <script type="text/javascript" src="vendor/angular/angular.js"></script>
    <script type="text/javascript" src="http://onlyoffice.example.com/OfficeWeb/apps/api/documents/api.js"></script>
  </head>
  <body>
    <div ng-controller="MyController">
      <onlyoffice-editor src="{{ document.src }}"
                         title="{{ document.name }}"
                         save="save(url, close)">
      </onlyoffice-editor>
    </div>
  </body>
</html>
```

```js
angular.module('app', [
  'onlyoffice'
]);

angular.module('app').controller('MyController', function($scope) {
  $scope.document = {
    'src': 'http://example.com/documents/foobar.docx',
    'name': 'FooBar'
  };
  
  $scope.save = function(url, close) {
    $http.post('/save-document.php', { source: url, target: 'foobar.docx' });
  };
});
```

_Assume that the script `save-document.php` will download `$_POST['source']` and overwrite `$_POST['target']`_

