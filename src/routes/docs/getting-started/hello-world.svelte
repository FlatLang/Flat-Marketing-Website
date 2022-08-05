<h1>CREATING A HELLO WORLD PROGRAM</h1>
<p>After having <a>downloaded</a> and installed Flat, enter the following code into a file named HelloWorld.flat</p>

<pre>
<code class="language-flat" use:highlightCodeElement>
class {`{`}
    public static main(String[] args) {`{`}
        Console.writeLine("Hello, world!")
    {`}`}
{`}`}
</code>
</pre>

<p>Then from command line, or terminal, navigate to the directory that you created the file in and run the following command:</p>

<pre>
<code class="language-bash" use:highlightCodeElement>
flatc HelloWorld.flat -o HelloWorld
</code>
</pre>

<p class="note" style="margin-top: 20px;">If you see an error that looks something like: "<i>'flatc' is not recognized as an internal or external command, operable program or batch file.</i>", follow the instructions explained <a ui-sref="docs.getting-started.configure-environment">here</a>.</p>

<p>You should see a new executable file outputted in the folder that you ran <span class="pre">flatc</span> in.</p>
<p>From the same command prompt window, you can run the HelloWorld program:</p>

<pre>
<code class="language-bash" use:highlightCodeElement>
    HelloWorld
</code>
</pre>

<p>or on non-windows platforms:</p>

<pre>
<code class="language-bash" use:highlightCodeElement>
    ./HelloWorld
</code>
</pre>

<p>And you should see:</p>

<pre>
<code class="language-bash" use:highlightCodeElement>
    Hello, world!
</code>
</pre>

<div class="note" style="margin-top: 20px;">
    <p>If you try to run the program by double click the executable, you will need to add the following line to your program to make it wait for user input before closing the window.</p>

<pre>
<code class="language-flat" use:highlightCodeElement>
class HelloWorld {`{`}
    public static main(String[] args) {`{`}
        Console.writeLine("Hello, world!")

        Console.waitForEnter()
    {`}`}
{`}`}
</code>
</pre>
</div>

<script>
    import {highlightCodeElement} from '/src/util';
</script>