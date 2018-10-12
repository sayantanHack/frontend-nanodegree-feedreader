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
     describe('RSS Feeds', function() {

         it('are defined', function() {
             expect(allFeeds).toBeDefined();
             expect(allFeeds.length).not.toBe(0);
         });


         /* Test that loops through each feed
          * in the allFeeds object and ensures it has a URL defined
          * and that the URL is not empty.
          */
         it('should have a URL defined which is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();      // check if URL exists in each feed
                expect(feed.url.length).not.toBe(0); // check if URL is not empty
            })
         });


         /* Test that loops through each feed
          * in the allFeeds object and ensures it has a name defined
          * and that the name is not empty.
          */
         it('should have a name defined which is not empty', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();      // check if content has a name for each feed
                 expect(feed.name.length).not.toBe(0); // check if there is content
             })
         });
     });


     describe('The menu', function() {
         // point menu icon to menuIcon for easy access
         var menuIcon = $('.menu-icon-link');

         /* Test that ensures the menu element is
          * hidden by default. You'll have to analyze the HTML and
          * the CSS to determine how we're performing the
          * hiding/showing of the menu element.
          */
         it('should have a menu that is hidden by default', function() {
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('should be clickable', function() {
             spyOn(menuIcon, 'click');
             menuIcon.click();
             expect(menuIcon.click).toHaveBeenCalled();
          });

         it('should toggle visibility when clicked', function() {
             menuIcon.trigger('click');                        // visible after first click
             expect($('body')).not.toHaveClass('menu-hidden'); // expect($('body').hasClass('menu-hidden')).toBe(false);

             menuIcon.trigger('click');                        // non-visible after second click
             expect($('body')).toHaveClass('menu-hidden');     // expect($('body').hasClass('menu-hidden')).toBe(true);
         });
     });


     describe('Initial Entries', function() {
         /* Test that ensures when the loadFeed
          * function is called and completes its work, there is at least
          * a single .entry element within the .feed container.
          * Remember, loadFeed() is asynchronous so this test will require
          * the use of Jasmine's beforeEach and asynchronous done() function.
          */

          // loadFeed argument will be called when async work is complete
          beforeEach(function(done) {
             loadFeed(0, done);
          });

          it('should contain ".feed" class in container', function() {
              expect($('body').find('.entry')).toHaveClass('entry');
          });

          // checks that within class '.feed', class '.entry' occurs more than once
          it('should have at least a single ".entry" element within ".feed" container', function() {
             var feed = $('.feed');
             expect(feed.find('.entry').length).toBeGreaterThan(0);
          });

     });


     /* Test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */
     describe('New Feed Selection', function() {
         var contentBefore;
         var contentAfter;

         beforeEach(function(done) {
             // store the first feed content title in contentBefore
             loadFeed(0, function() {
                 contentBefore = $('.entry').find("h2")[0].innerText;
             });

             // store the second feed content title in contentAfter
             loadFeed(1, function() {
                 contentAfter = $('.entry').find("h2")[0].innerText;
                 done();
             });
         });

         it('should have different contents when new feed is loaded', function() {
             expect(contentBefore).not.toEqual(contentAfter);
         });

         // feed content is reset to first content after all specs has been run
         afterAll(function(done) {
             loadFeed(0, done);
          });
     });

 }());
