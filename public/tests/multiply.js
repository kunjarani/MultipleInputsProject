describe('Testing AngularJS Controller', function () {
    it('Any value -1 or less should cause the button to be disabled', function() {
        module('angularTest');
  
        var scope = {
            userObject: {
                num1: -1,
                num2: 10
            }
        };
        var ctrl;
  
        inject(function($controller) {
          ctrl = $controller('mainController', {$scope:scope});
        });
        userform = {
            
        };
        scope.validateValue(userform);
        expect(scope.disableButton).toBe(true);
    });

    it('value => 0 should be considered a valid input', function() {
        module('angularTest');
  
        var scope = {
            userObject: {
                num1: 3,
                num2: 0
            }
        };
        var ctrl;
  
        inject(function($controller) {
          ctrl = $controller('mainController', {$scope:scope});
        });
        userform = {
            Input1: {
                $error: {
                    pattern: false
                }
            },
            Input2: {
                $error: {
                    pattern: false
                }
            }
        };
        scope.validateValue(userform);
        expect(scope.disableButton).toBe(false);
      });

      it('Any text values should cause the field to be disabled ', function() {
        module('angularTest');
  
        var scope = {
            userObject: {
                num1: 'testData',
                num2: 0
            }
        };
        var ctrl;
  
        inject(function($controller) {
          ctrl = $controller('mainController', {$scope:scope});
        });
        userform = {
            Input1: {
                $error: {
                    pattern: true
                }
            },
            Input2: {
                $error: {
                    pattern: false
                }
            }
        };
        scope.validateValue(userform);
        expect(scope.disableButton).toBe(true);
      });
});