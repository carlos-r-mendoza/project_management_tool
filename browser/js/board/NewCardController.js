app.controller('NewCardController', function ($scope, $modal, $modalInstance, BoardService, BoardManipulator, RepoFactory, featureName, featureInfo, $rootScope, $stateParams, sprintBoard, BoardModel) {
  $scope.featureName = featureName;

  $scope.newCard = {
      title: '',
      details: '',
      status: 'Open',
      assignee: '',
      label: 'Feature - '+ featureName,
      milestone: featureInfo.number,
      phase: 'open' 
  };

  $scope.close = function () {
    $modalInstance.close();
  };

 $scope.board = sprintBoard;

 function rejected(error){
  console.log(error);
 }

  $scope.addCard = function(newCard, featureName){ 

    console.log(newCard);
    
    var taskInfo = {
                user: $stateParams.owner,
                repo: $stateParams.name,
                title: newCard.title, 
                body: newCard.details, 
                assignee: newCard.assignee, 
                milestone: newCard.milestone,
                labels: [newCard.label]
              };
    //taskInfo.push("Feature - Testing");
    BoardManipulator.addCardToFeature($scope.board, featureName, 'Open', newCard);
    RepoFactory.createRepoIssue($stateParams, taskInfo);
    $modalInstance.close();
  };

});