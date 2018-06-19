Twinkle
=======

Twinkle是维基人用于快速执行常见维护工作（如提交删除候选及清理破坏）的JavaScript库和应用程式。

它构建于已被许多维基百科脚本和编辑工具使用的`morebits.js`库之上。

查看中文维基百科上的[Wikipedia:Twinkle][]以获取更多信息。

[AzaToth][]是本工具和`morebits.js`库的的最初作者和维护者。

此代码库的结构
--------------

* `morebits.js`：Twinkle和许多其他脚本使用的中央库，包含与MediaWiki API进行交互、显示表单和对话框、生成状态日志及执行其他有用工作的代码。这当中大部分代码都不是Twinkle特有的。
* `morebits.css`：`morebits.js`所附带的样式表。在Modern皮肤中应用的一些样式是Twinkle特有的，或许这些应该被放进`twinkle.css`里。
* `sync.pl`：用来更新维基上小工具、或用维基上的修改更新此代码库的Perl脚本。参见下方的完整文档。
* `twinkle.js`：通用的Twinkle特有代码，大部分用于处理参数设置和在UI中显示Twinkle。此外，这个文件包含了Twinkle的默认参数。
* `modules`：包含了单个Twinkle模块。相关说明可在头部注释或[Twinkle文档][]中找到。模块`twinkleconfig.js`用于提供[Twinkle参数设置][WP:TWPREFS]。

其他没有提到的文件大概已经过时了。

更新Wikipedia上的脚本
---------------------

有两种方式将Twinkle脚本上传到维基百科或其他地方。

### 手工拼接

**此处的指引已过时，请勿使用否则你很可能搞坏东西。**

要生成拼接后的Twinkle脚本，请使用以下`bash`命令：

    awk 'FNR==1{print ""}{print}' twinkle.js modules/*.js > alltwinkle.js

運行指令：
    所有檔案：`python upload.py [用戶名] [密碼]`
    部分檔案：`python upload.py [用戶名] [密碼] [檔案1] [檔案2] ... `

格式指引
--------

虽然旧的代码有许多不同且不一致的格式，但我们已经决定要在代码中使用更为一致的格式。

[jQuery Core Style Guideline][jq_style]是我们在此之后使用的格式指引。

无需多言，例外也是存在的。这主要和括号旁的空白有关：旧Twinkle代码看起来像`if ( condition ) {`，但新代码一般会用`if (condition) {`。惯例是跟随周围代码的样式。

[Wikipedia:Twinkle]: https://zh.wikipedia.org/wiki/Wikipedia:Twinkle
[AzaToth]: https://en.wikipedia.org/wiki/User:AzaToth
[Twinkle文档]: https://zh.wikipedia.org/wiki/Help:Twinkle
[WP:TWPREFS]: https://zh.wikipedia.org/wiki/WP:TWPREFS
[MediaWiki:Gadget-Twinkle.js]: https://zh.wikipedia.org/wiki/MediaWiki:Gadget-Twinkle.js
[MediaWiki:Gadget-morebits.js]: https://zh.wikipedia.org/wiki/MediaWiki:Gadget-morebits.js
[MediaWiki:Gadget-morebits.css]: https://zh.wikipedia.org/wiki/MediaWiki:Gadget-morebits.css
[MediaWiki:Gadgets-definition]: https://zh.wikipedia.org/wiki/MediaWiki:Gadgets-definition
[Git::Repository]: http://search.cpan.org/perldoc?Git%3A%3ARepository
[MediaWiki::Bot]: http://search.cpan.org/perldoc?MediaWiki%3A%3ABot
[App::cpanminus]: http://search.cpan.org/perldoc?App%3A%3Acpanminus
[jq_style]: http://contribute.jquery.org/style-guide/js/
