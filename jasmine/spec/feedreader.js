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

   describe('RSS Feeds',() =>{

     it('feeds are defined', ()=> {
       expect(allFeeds).toBeDefined(;
       expect(allFeeds.length).not.toBe(0));
     });

     it('URLs are defined',()=>{
        for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url.length).not.toBe(0);
        };
     });

     it('names are defined',()=> {
       for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name.length).not.toBe(0);
       };
     });

   });

   describe('The Menu', () => {

     it('menu element is hidden', ()=>{
       expect($('body').hasClass('menu-hidden')).toEqual(true);
     });

     it('working toggle on click event', ()=>{
       $('.menu-icon-link').trigger('click');
       expect($('body').hasClass('menu-hidden')).toBe(false);
       $('.menu-icon-link').trigger('click');
       expect($('body').hasClass('menu-hidden')).toBe(true);
     });

   });

   describe('Initial Entries', ()=>{
      beforeEach((done) => {
        loadFeed(0, ()=>{
          done();
        });
      });

      it('define if entry has more than 0 entries', ()=>{
        expect($('.entry .feed')).toBeDefined();
      });

   });

   describe('New Feed Selection',()=>{
     beforeEach((done)=>{
       $('.feed').empty();
       loadFeed(0, ()=>{
         entriesStart = $('.feed').find(allFeeds.url);
         done();
       });

       loadFeed(1,()=>{
         entriesEnd = $('.feed').find(allFeeds.url);
         done();
       });
     });

     it('new feed is different to old one',()=>{
       expect(entriesStart).not.toBe(entriesEnd);
     });

   });

 }());
