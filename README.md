# Multiple Select Filter

## Assignment

Setup a project and create a `MultipleSearchFilter` component based on the given requirements.

### Requirements

* Show the multi-select and fill it with the given JSON data using http
* Create a search which can filter the JSON data
* Make it possible to select multiple items
* Selected items need to be ordered on top, also they should not be affected by the search filter
* BONUS: store the selected items locally. They should persist after page reload.

### Primary criteria:

* structured HTML/CSS/Javascript
* JS architecture (ex. MVC pattern)
* HTTP/REST
* ES6 / TypeScript

### Secondary criteria:

* Advanced css (Less/Sass/Responsive/?)
* Data storage
* Build street setup (npm/gulp/webpack/?)

## Result

Created Multiple Select Filter component using React and MUI library.

Check final result [here](https://multiple-select-filter-g30ntake6-annadarina.vercel.app/).

## Run App in the Development Mode
1. Clone the repo
2. Run `npm install`
3. Run `npm run start`
4. Open [http://localhost:3000](http://localhost:3000) to view app in the browser

## Next Steps and Improvements

These improvements and customization options will enhance the functionality and flexibility of the Multiple Select
Filter component.

1. Performance optimization:
    1. Implement virtualization: Libraries like `react-virtualized` or `react-window` provide components and utilities
       to
       implement virtualization for the large lists. This approach significantly reduces the number of DOM elements and
       improves performance.
    2. Debounce the Search Input: Consider debouncing the search input's `onChange` event. Debouncing ensures that the
       filtering logic is only triggered after a certain delay of user inactivity, reducing unnecessary re-rendering and
       improving performance.
2. Customization options:
    1. `textFieldProps` to customize the TextField component.
    2. `listItemComponent` to provide a custom component to render the list items.
    3. `placeholderComponent` to provide a custom component to render the placeholder when no options are found or an
       error occurs.
    4. `loadingComponent` to provide a custom component to render the placeholder for the loading state.
    5. `buttonProps` to pass additional props for the `Button` component. 
