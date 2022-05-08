# English -英文-

# Why using jquery in react😂?

Just for old-expreance using in morden workflow <br>
For example:<br>

### jQuery Easing

```javascript
//Can quikely control any elements binded with ref
$(someElemRef.current).show();
$(someElemRef.current).fadeIn();

//The code shows upon is not the point,this is the point:
//Easing Animation:
$({ opacity: 0, bkd: 0 }).animate(
  { opacity: 1, bkd: 2 },
  {
    duration: 200,
    easing: 'easeOutQuart',
    progress: function() {
      $(someElemRef.current).css('opacity', this.opacity);
      $(someElemRef.current).css('backdrop-filter', 'blur(' + this.bkd + 'px)');
    },
    complete: function() {
      $(someElemRef.current).css('opacity', this.opacity);
      $(someElemRef.current).css('backdrop-filter', 'blur(' + this.bkd + 'px)');
    },
  }
);

//Using throw this kind of "last century" code could allows u to do some RELLY quike codeing
```

In `animate()` function, I had put easing plugin inside, can using easing functions by animate() straightaway. <br>
Easing plugin comes from: <br>
`https://github.com/gdsmith/jquery.easing` <br>
Easing plugin usage: <br>
`https://www.cnblogs.com/yangpeixian/p/10919817.html`<br>

# jQuery usage

Jquery allows u to do more magic code <br>
`https://api.jquery.com/`<br>

# @bobliao/use-jquery-hook

`npm install @bobliao/use-jquery-hook`

`yarn add @bobliao/use-jquery-hook`

```javascript
import useJquery, { jQueryObject, isRunningInServer } from '@bobliao/use-jquery-hook';

(...)
  //Get jquery out of the box
  const $ = useJquery();

  //If you r using TypeScript
  const $:jQueryObject = useJquery();

  (...)
  //If u r using razzle or Next,Could allow you do this to get is the code running in server or client
  if(isRunningInServer){
    //running in server
  }else{
    //running in client
  }
  (...)

(...)

```

# SSR Supported

This hook could run in SSR project without any `window undefined ERROR`.<br>
Even can determine the code is running in server side or client side,throw this:<br>

```javascript
import useJquery, {
  jQueryObject,
  isRunningInServer,
} from '@bobliao/use-jquery-hook';

if (isRunningInServer) {
  //running in server
} else {
  //running in client
}
```

===

# 中文 -Chinese-

# 为什么在 react 里用 jquery😂?

为了可以节省时间，免得在过于碎片化的代码里飞来飞去费眼费神，有些本来就很简单的事情就用简单的方式来解决就好了。<br>
比如：<br>

### Javascript Easing

```javascript
//可以快速操作绑定了ref的元素（不推荐直接操作($(".xxx"),$("#xxx"))，往往容易引起一些混乱，适可而止就好了，不然为什么用react呢?）
$(someElemRef.current).show();
$(someElemRef.current).fadeIn();

//当然非要这么用我也不拦着你，哈哈
$('#container').fadeIn();

//实际上上面的代码还不是目的，下面才是最终目的
//可以快速方便地使用缓动算法，可以缓动任何数值css等，不用把代码拆得七零八落:
$({ opacity: 0, bkd: 0 }).animate(
  { opacity: 1, bkd: 2 },
  {
    duration: 200,
    easing: 'easeOutQuart',
    progress: function() {
      $(someElemRef.current).css('opacity', this.opacity);
      $(someElemRef.current).css('backdrop-filter', 'blur(' + this.bkd + 'px)');
    },
    complete: function() {
      $(someElemRef.current).css('opacity', this.opacity);
      $(someElemRef.current).css('backdrop-filter', 'blur(' + this.bkd + 'px)');
    },
  }
);

//通过上面这种“老掉牙”的方式，可以快速编写一些动画效果。
```

笔者已经将 Easing 插件内置在了这个钩子里，可以直接通过`animat()`函数使用 Easing。 <br>
Easing 插件来源: <br>
`https://github.com/gdsmith/jquery.easing` <br>
使用方法参考: <br>
`https://www.cnblogs.com/yangpeixian/p/10919817.html`<br>

# jQuery 使用方法

jQuery 还是有可取之处的，不了解的可以了解一下。 <br>
`https://api.jquery.com/`<br>

# @bobliao/use-jquery-hook

`npm install @bobliao/use-jquery-hook`

`yarn add @bobliao/use-jquery-hook`

```javascript
import useJquery, { jQueryObject, isRunningInServer } from '@bobliao/use-jquery-hook';

(...)
  //从钩子里取出jquery
  const $ = useJquery();

  //如果你用了TypeScript可以指定这个类型
  const $:jQueryObject = useJquery();

  (...)
  //如果在使用SSR,可以通过这个被导出的变脸判断当前代码是运行在服务器端还是运行在客户端
  if(isRunningInServer){
    //如果运行在服务器端
  }else{
    //如果运行在客户端
  }
  (...)

(...)

```

# 支持 SSR 运行环境

这个钩子支持 SSR 运行环境，无论您的项目使用的是 Razzle 或者 Next 都不会被`window undefined ERROR`困扰.<br>
您甚至可以通过这种方式判断当前代码运行在哪个环境下以避免一些 dom 或 bom 操作错误:<br>

```javascript
import useJquery, {
  jQueryObject,
  isRunningInServer,
} from '@bobliao/use-jquery-hook';

if (isRunningInServer) {
  //如果运行在服务器端
} else {
  //如果运行在客户端
}
```
