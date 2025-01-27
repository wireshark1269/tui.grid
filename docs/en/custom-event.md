# Custom Event 🛎

The TOAST UI Grid has a powerful event system which provides ways to extend custom functionality on top of the built-in features. 

## Attach / Detach event handlers

To attach a handler to a specific event, you can use the public method `on()`. The first argument is a name of target event, and the second argument is a handler to attach. 

```javascript
import Grid from 'tui-grid';

const grid = new Grid({
  // options…
});

grid.on('click', function() {
  console.log('clicked!!');
})

grid.on('dblclick', function() {
  console.log('double clicked!!');
});
```

To detach a handler from a specific event, you can use the public method `off()`. Like the `on()` method, the first argument is a name of target event. The second argument is handler attached, but it is optional. If you don't use the second argument, all handlers attached to the event is detached.

```javascript
grid.off('click');
// or
grid.off('click', onClickHandler);
```

## GridEvent
When an event occurs, an instance of the `GridEvent` instance is passed to the handler attached to the event. It has useful information which can be used by event handler. For example, if the `click` event occurs, `rowKey`, `targetType` and `columnName` value is set to the `GridEvent` instance so that user can figure out the address of the target cell.

```javascript
grid.on('click', function(ev) {
  if (ev.rowKey === 3 && ev.columnName === 'col1') {
    // do something
  }
});
```

The `GridEvent` instance also has the `stop()` method which can be used to prevent default action of the event. For example, if you want to prevent for a specific row not to be selected, you can attach a handler to the `click` event and call the `ev.stop()`.

```javascript
grid.on('click', function(ev) {
  if (ev.rowKey === 3) {
    ev.stop();  
  }
});
```

The `GridEvent` instance can have a `nativeEvent` property, this is the browser's native events like `click`, `mousedown` and so on.

```javascript
grid.on('mousedown', function(ev) {
  console.log(ev.nativeEvent);
});
```

## Available events

- `click` : When a mouse button is clicked on a table cell
- `dblclick` : When a mouse button is double clicked on a table cell
- `mousedown` :  When a mouse button is pressed on a table cell
- `mouseover` : When a mouse pointer is moved onto a table cell
- `mouseout` : When a mouse pointer is moved off a table cell
- `focusChange` : When a table cell focus is selected
- `check`: When a row header checkbox is filled
- `uncheck`: When a row header checkbox is cleared
- `selection`: When the selection area of the table is changed.

There are other events that can be used when using `DataSource`.

- `beforeRequest` : Before the http request is sent
- `response` : When the response is received from the server
- `successResponse` : After the `response` event, if the `response.result` is `true`
- `failResponse` : After the `response` event, if the `response.result` is `false`
- `errorResponse` : After the `response` event, if the response is Error

You can see the detail information of these events at the [API page](https://nhn.github.io/tui.grid/latest/Grid#event-beforeRequest).

## Example

You can see the example which uses custom event [here](https://nhn.github.io/tui.grid/latest/tutorial-example15-custom-event).
