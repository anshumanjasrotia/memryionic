angular.module('starter.controllers', [])

.controller('EntriesCtrl', function($scope, Entries) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.entry = {};

  // Add Entry
  $scope.entry.add = function(entry) {
    $scope.entries.push($scope.entry);
    $scope.entry = '';
  };

  // Edit Entry
  $scope.entries = Entries.all();
  $scope.edit = function(entry) {
    Entries.remove(entry);
  };

  // Update Entry
  $scope.update = function(entry) {
    Entries.update(entry);
  };

  // Remove Entry
  $scope.remove = function(entry) {
    Entries.remove(entry);
  };

  $scope.entry.date = new Date();

})

.controller('NewCtrl', function($scope, $ionicModal) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('/templates/entries/new.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
})

.controller('EditCtrl', function($scope, $ionicModal) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('/templates/entries/edit.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
})

// popover to edit and delete entries
.controller('PopoverCtrl', function($scope, $ionicPopover) {

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

})

.controller('ShareCtrl', function($scope, $ionicModal) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('/templates/entries/share.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
})

.controller('TagsCtrl', function($scope, Tags) {
  $scope.tags = Tags.all();
  $scope.remove = function(tag) {
    Tags.remove(tag);
  };
})

.controller('UserCtrl', function($scope, $http) {

  $scope.register = function(user){
    // console.log(user);
    var user_data = {
      'user': {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
      }
    }
    $http.post('http://da1a5e94.ngrok.io/api/v1/registrations',user_data).success(function(res){
      if("ok" == res.status){
        $scope.showMessage = true;
        $scope.message = res.message;
      }
    })
  }

  // $scope.user = {
  //   first_name: "Jake",
  //   last_name: "Thompson",
  //   email: "test@gmail.com"
  // }
  // $scope.user.addUser
})


// Controller for switching between tabs
.controller('PanelCtrl', function($scope) {
  $scope.tab = 1;

  this.selectTab = function(setTab) {
    $scope.tab = setTab;
  }

  this.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  }
})
