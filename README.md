# color-conversion

##Intention

JavaScript library for color conversion and manipulation with support for CSS color strings.

##Installation

```sh
npm install color-conversion
```

## Usage

```js
var Color = require("color-conversion")
```
or
```js
import Color from "color-conversion"
```

## Setters

The instance is tranformimg RGB to HSL. You should use the 'toHSL' method.
```js
var color = Color("rgb(255, 255, 255)");  	//It's can write as var color = Color("255, 255, 255");
color.toHSL();  		//[3,0,100]
```
It's also can transform HSL to RGB(You should use the 'toRGB' method.),such as:
```js
var color = Color("hsl(100, 10%, 25%)");	//It's can write as var color = Color("100, 10%, 25%");
color.toRGB(); //[60,64,57]
```

## Method
The library has three methods.That is [toRGB],[toHSL] and [toHex].The method will return an array incloude the transformational color. 