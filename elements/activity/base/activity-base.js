Polymer('activity-base', {
  helper: {
    toElementName: function(activityName) {
      return activityName.replace(/_/g, '-');
    }
  }
});
