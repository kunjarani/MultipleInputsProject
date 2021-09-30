//Module
var angularTest = angular.module("angularTest",[]);

// Services
angularTest.service("mainService", function($http){
    var self = this;   
   //getData
   self.getData = function(){ 
      return $http.get("http://localhost:3000/api/multiplyData");
   };
   //SaveData
   self.saveData = function(user){
      return $http.post("http://localhost:3000/api/saveMultiplyData",user);
   }
})

// Controllers
angularTest.controller("mainController",["$scope","$log","mainService",function($scope,$log,mainService){
   $scope.multiplyData = [];


    //OnLoad getdata    
   mainService.getData().then(function successCallback(result){
       $scope.multiplyData = result.data;
       $scope.multiplyDataObject = $scope.multiplyData[$scope.multiplyData.length - 1] || {};
   },function errorCallback(error,status){
      $log.log("Error",error , "Status",status);
      $scope.multiplyData = [];
      $scope.multiplyDataObject = {};
   });


   //function to validate the Inputs and disable the button      
   $scope.validateValue = function(multiplyForm){
      $scope.multiplyDataObject.multiply = "";
   if(
      $scope.multiplyDataObject.num1 < 0 ||
      $scope.multiplyDataObject.num2 < 0 ||
      multiplyForm.Input1.$error.pattern ||
      multiplyForm.Input2.$error.pattern ||
      multiplyForm.$invalid){
         $scope.disableButton = true; 
   } else{
      $scope.disableButton = false;
   }  
   } 


 // function to calculate the form after all validation has occurred            
 $scope.calculateForm = function(isValid, multiplyDataObject) {

  // check to make sure the form is completely valid
  if (isValid) {
    $scope.multiplyDataObject.multiply = $scope.multiplyDataObject.num1 * $scope.multiplyDataObject.num2;
    $scope.multiplyDataObject.itemId = $scope.multiplyData.length;
    mainService.saveData($scope.multiplyDataObject).then(function successCallback(result){
      return result;
   },function errorCallback(error,status){
      $log.log("Error",error , "Status",status);
   });

  }

};

}])


//Directives
angularTest.directive("multiplyDirective",function(){
   return{
           restrict:'E',
           template: '<p>Multiply:{{multiplyDataObject.multiply}}</p>',
           replace: true

   }



})