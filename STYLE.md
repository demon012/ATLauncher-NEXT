# Coding standards & styling guidelines
If you wish to submit a pull request then please take a look at the below sections about our coding and styling standards before make said pull request.

## Coding standards
Coding standards are absolutely essential to having your pull request approved. While we may not close your pull request if it doesn't follow these coding standards, we most likely will delay merging
it until compliant.

- All line lengths must be kept less than 200 characters and use 4 spaces rather than tab characters.
- All JSON documents should use 4 space indentation with the exception of package.json.
- Don't do large code commits. Make a single commit for a single fix/addition rather than bundled up commits.
- Document appropriately. While there is no need to put single line comments in for everything, having doc blocks and comments where necessary helps others see what the code does.
- Make sure all code adheres to the provided JSHint and JSCS standards. Running 'gulp style' will run both checkers and check for any issues.
- Increment the version in the package.json before the last commit before release. Nothing worse than having to question if it's already been incremented or not.
- Develop on the 'develop' branch. No commits on the 'master' branch are to be done. A Pull Request will be made to merge the changes from develop to master when a new version is released.
- All js files should be wrapped inside an IIFE (immediately invoked function expression) so as to not pollute the global namespace.
- Use let instead of var whenever needing to declare a non constant variable.
- Make sure there are no multi line variables. All variables should be declared one per line with no multi line declarations.
- When needing to access this in a callback of a method, the variable to store this should be called self. For example (let self = this;).
- All files should be saved with lowerCamelCase names.
- All classes should be named (not the filename, just the class name) UpperCamelCase with no spaces or other non alphanumeric characters.
- A 'use strict' statement should be the first line after the starting line of the IIFE in every JavaScript file.

### Classes
Classes should always use Symbols to hide the original data so it cannot be accessed with appropriate getters and setters.

Immediately in the body of the class should be the constructor followed by any getter/setter methods (using the get/set keyword) and then followed by any other methods of the class.

Lastly any callbacks used internally by the class should be referenced at the bottom of the file (outside of the class) for JSDoc purposes.

### Requires
When using the require syntax in js files, all require statements should be at the top of the file, under the license declaration and strict statement.

When using modules from different methods, they should be separated out into groups, with external NPM modules first, then the applications internal modules first, then finally any application
internal classes.

All require groups should be sorted by length with the shortest statement at the top and the longest at the bottom. In the case of a tie, it should be in alphabetical order by the variables name.

### Example
```js
/*
 * LICENSE HERE SEE OTHER FILES FOR THE LICENSE HEADER TO USE HERE
 */

// IIFE at the start of all files after the license
(function() {
    'use strict'; // use strict at the start of all files

    // Variable declarations should be written separately
    let c = 3;
    let d = 4;

    // Object symbol to hide data from being accessed/modified from outside the class.
    const objectSymbol = Symbol();

    class TestClass {
        constructor(data) {
            this[objectSymbol] = {data};
        }

        // Getters and setters first
        get data() {
            return this[objectSymbol].data;
        }

        set data(data) {
            this[objectSymbol].data = data;
        }

        // Then methods
        aaaa() {
            console.log('The aaaa method comes after the getter even though it\'s alphabetically first!');
        }
    }
})();
```

## Styling guidelines
Styling guidelines are just how we prefer to have doc blocks and comments written. Not following these guidelines will not get your pull requests denied as they're less important than our actual
coding standards listed above.

For details on JSDoc used for all JavaScript files, see [this website](http://usejsdoc.org/).

- Make sure all doc block information has a period at the end.
- Make sure all doc block @ elements don't have a period at the end.
- Make sure all type declarations use the Type definitions. For instance {String} instead of {string}.
- Make sure all comments after the - in @ doc block elements start with a lowercase
- Make sure all comments not in doc blocks don't end in a period.
- Make sure there is a blank line between any main doc block information and any @elements.
- Make sure all callbacks are documented at the very bottom of the file.

### Example
    // Some comment. Which doesn't end in a period

    /**
     * Where the magic happens. Notice I end in a period.
     *
     * @param {String} arguments - lower case start. All the arguments passed in from the command line, notice I don't end in a period
     */