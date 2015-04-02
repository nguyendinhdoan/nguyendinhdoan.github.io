Polymer({
  ready: function() {
    this.activities = [];
  },

  onResponseActivityData: function(e, detail) {
    var activity = detail.response;
    this.activities.push(activity);

    // Import Activity Elements
    var owner = this;
    Polymer.import([this.getActivityFilePath(activity.type)], function() {
      owner.insertActivityNode(activity);
    });
  },

  shortName: function(value) {
    if (value && value.length > 12) {
      return value.substr(0, 12);
    }
    return value;
  },

  getActivityFilePath: function(activityName) {
    return 'elements/activity/' + activityName + '/' + activityName + '.html';
  },

  selectMenu: function() {
    this.$.scaffold.closeDrawer();
  },

  insertActivityNode: function(activity) {
    var wrapperNode = document.createElement('section');
    var wrapperNodeAttrs = 'layout vertical center-center'.split(' ');
    wrapperNodeAttrs.forEach(function(e) {
      wrapperNode.setAttributeNode(document.createAttribute(e));
    });
    wrapperNode.setAttribute('name', activity.type);

    var activityNode = document.createElement(activity.type.replace(/_/g, '-'));

    // Pass data to activity element
    activityNode.activity = activity;

    // Append DOM into activity-list
    wrapperNode.appendChild(activityNode);
    this.$.activityPages.appendChild(wrapperNode);

    if (activity.type == 'Common_ChooseDifferentWord') {
      this.$.activityPages.selected = activity.type;
    }
  }
});
