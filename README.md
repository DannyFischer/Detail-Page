# What is this?
This is a Jekyll based site used to show some additional details about the stuff I do.

# Tell me more!
## gulp.js
The build system does the heavy lifting. Such as compiling the Sass to minified CSS, generation of the inlined SVG symbol definitions, bitmap image optimization and finally serving the Jekyll generated site through BrowserSync with live reloading capabilities.

## Sass
Sass is compiled with the ruby-sass compiler instead of the slightly faster gulp-sass version because there are two Gem dependencies: Bourbon and Neat.

### BEM
I usually write **BEM**-styled Sass with nested rules who extend the parents *Block* or *Element* selector:

```scss
.block {
    [...]

    &__element {
        [...]

        &--modifier {
        [...]
        }
    }
}
```

Where convenient I manually write the whole combined selectors for readability reasons:

```scss
.block {
    [...]
}

.block__element {
    [...]
}

.block__element--modifier {
    [...]
}
```

## JavaScript
The gulp.js JavaScript task concats and minifies all JavaScript files, libraries and plugins into one resource (main.js) which is loaded asynchonously in the footer. Unnecessary browser requests avoided, great.

The configuration is set to prepend the contents of `libraries` (e.g. jQuery) and `plugins` to the `main.js` file, which contains project specific JavaScript and is additionally linted. JShint is used for the linting task while it is set to ignore third-party scripts.

The distribution-ready file structure: *Libraries » Plugins » Custom JS*


# Requirements
- Node.js
- Ruby
- Jekyll


# Example Workflow
1. `git clone git@github.com:DannyFischer/Detail-Page.git`
2. `cd Detail-Page`
3. `npm install`
4. Run `gulp` and create things
5. Put the content of the `_site` folder on a web server.


# Colophon
- The background image used in the about panel is adapted from my wallpaper [The Next Polylog](https://danny.fm/project/the-next-polylog).
