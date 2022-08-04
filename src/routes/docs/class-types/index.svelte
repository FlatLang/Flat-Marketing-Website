<h1>CLASS TYPES</h1>
<p>
    Flat contains three different types of class structures:
</p>
<ul>
    <li><a href="/docs/class-types/classes">Classes</a></li>
    <li><a href="/docs/class-types/interfaces">Interfaces</a></li>
    <li><a href="/docs/class-types/traits">Traits</a></li>
</ul>
<p>
    Each of these has their own strengths and weaknesses. For instance, you can only inherit from one class at most. In contrast, you can inherit from as many traits and interfaces as you want. Because of this, traits and interfaces cannot have formal constructors. Traits differ from interfaces in such that traits can define method bodies and class properties. Interfaces are just like traditional Java interfaces; they only contain abstract method declarations.
</p>
<p>Using the code shown, you can create an instance of <code class="language-flat" use:highlightCodeElement>MyClass</code> with an instantiation as such: <code class="language-flat" use:highlightCodeElement>let myObj = new MyClass()</code>. Then you can call any of the functions defined in the class or its ancestors (<code class="language-flat" use:highlightCodeElement>MyTrait</code> and <code class="language-flat" use:highlightCodeElement>MyInterface</code>). You could call:</p>
<ul>
    <li><code class="language-flat" use:highlightCodeElement>myObj.saySomething()</code> which would output <code class="language-bash" use:highlightCodeElement>My value is: 'my value'</code></li>
    <li><code class="language-flat" use:highlightCodeElement>myObj.calculateValue()</code> which returns a String <code class="language-flat" use:highlightCodeElement>"my value"</code></li>
    <li><code class="language-flat" use:highlightCodeElement>myObj.plus(5)</code> which adds 5 to <code class="language-flat" use:highlightCodeElement>myObj.id</code> and returns <code class="language-flat" use:highlightCodeElement>myObj</code></li>
</ul>

<script>
    import {highlightCodeElement} from '/src/util';
</script>