/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 $(function() {
   var entriesStart,
        entriesEnd;

   describe('RSS Feeds',function() {

     it('feeds are defined', function() {
       expect(allFeeds).toBeDefined(;
       expect(allFeeds.length).not.toBe(0));
     });

     it('URLs are defined',function(){
        for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url.length).not.toBe(0);
        };
     });

     it('names are defined',function() {
       for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name.length).not.toBe(0);
       };
     });

   });

   describe('The Menu', function() {

     it('menu element is hidden', function(){
       expect($('body').hasClass('menu-hidden')).toEqual(true);
     });

     it('working toggle on click event', function(){
       $('.menu-icon-link').trigger('click');
       expect($('body').hasClass('menu-hidden')).toBe(false);
       $('.menu-icon-link').trigger('click');
       expect($('body').hasClass('menu-hidden')).toBe(true);
     });

   });

   describe('Initial Entries', function(){
      beforeEach((done) => {
        loadFeed(0, function(){
          done();
        });
      });

      it('define if entry has more than 0 entries', function(){
        expect($('.entry .feed')).toBeDefined();
      });

   });

   describe('New Feed Selection',function(){
     beforeEach((done)=>{
       $('.feed').empty();
       loadFeed(0, function(){
         entriesStart = $('.feed').find(allFeeds.url);
         done();
       });

       loadFeed(1,function(){
         entriesEnd = $('.feed').find(allFeeds.url);
         done();
       });
     });

     it('new feed is different to old one',function(){
       expect(entriesStart).not.toBe(entriesEnd);
     });

   });

 }());
