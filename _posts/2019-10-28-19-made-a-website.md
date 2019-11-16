---
layout: default
title: So, I made a website!
description: From 0 knowledge in HTML/CSS/JS to still 0 knowledge in HTML/CSS/JS.
---

<h2 class="page-header-brief">projects</h2>
<div class="line-sep"></div>
<h2 style="margin-bottom: 0;">{{ page.title }}</h2>
<div>
	{% assign d = page.date | date: "%d" | plus:'0' %}
	{{ page.date | date: "%B" }}
	{% case d %}
	{% when 1 or 21 or 31 %}{{ d }}st,
	{% when 2 or 22 %}{{ d }}nd,
	{% when 3 or 23 %}{{ d }}rd,
	{% else %}{{ d }}th,
	{% endcase %} {{ page.date | date: "%Y" }}
</div>
<br>




First things first:

"You **do** know there are thousands of HTML and CSS tutorials online right?"
* Yes

"You also **do** know that there are also online services that build websites based on a dead simple GUI right?"
* Yes

So I suppose the natural question after that is why it took me a total of 12 hours to get this dinky website up. If it weren't already obvious, I am:

1. Stubborn. I figured the most convenient way to learn about a totally new landscape was to make mistakes and _then_ google them afterwards. But we all know this didn't really work did it? The language itself isn't difficult, but having to figure out how each .md and .html and .css file interacted with each other over this unknown environment took me awhile. It still is my fault for burning daylight though. :P
2. Very easily distracted by details. I choose to spend time going through colour options for my site before I actually fix the framework of the site.

So yeah, that's about it. For now, what follows is fixing all my ```class ```and ```id ``` tags to make styling with CSS easier. And then the follow up would be just simply adding more content! Both of which would unlikely be documented in here, but I _am_ kinda excited to see how this page evolves over time to be honest. In any case:

```c
if(!succeed){
	try_again();
}
```
