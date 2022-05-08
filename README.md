# A sample corner-popup component

This component can work with vue or react

# @bobliao/consolelay

`npm install @bobliao/consolelay`

`yarn add @bobliao/consolelay`

```javascript

import consoleLay from `@bobliao/consolelay`;

(...)
//Trigger a little popup with message
consoleLay.write('This is a message!');

//Trigger message popup with conditions
consoleLay.write({
		//Message
		m: "Put messages here",
		//Disappear delay
    //Could put "inf" to display infinite
		time: 8000,
    //line-style
		style: "",
		borderColor: "",
    //Could Customize class
		classAdd: "arrow-consoleLay-white",
    //Will go into here when click close or timmed up
		closeCall: function () {},
});
(...)

```
