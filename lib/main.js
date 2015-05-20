/**
 * @license ractive-decorators-pikaday Copyright (c) 2014, Uhray LLC
 * Available via the MIT license.
 * see: http://github.com/uhray for details
 */
define(['moment', 'pikaday', 'css!bower_components/pikaday/css/pikaday'],
function(moment, Pikaday) {

  Ractive.decorators.pikaday = function(node, keypath) {
    var self = this,
        setting = false,
        picker = new Pikaday({
          field: node,
          onSelect: function(date) {
            setting = true; // to prevent infinite loop
            self.set(keypath, date);
            setting = false;
          },
          format: 'MM/DD/YYYY',
          showTime: true,
          use24hour: true
        });

    this.observe(keypath, function(date) {
      if (setting) return;
      picker.setDate(date);
    });

    return {
      teardown: function() {
        // Teardown goes here
        picker.destroy();
      }
    };
  };

});
