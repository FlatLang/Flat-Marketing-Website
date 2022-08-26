<template lang="flat-html">
	<h1>CREATING A HELLO WORLD PROGRAM</h1>
	<p>
		After having <a href="/download">downloaded</a> and installed
		<a href="/download#installation">Airship</a>, run the following command:
		<code bash>airship init</code>
	</p>
	<p>Run through the init process:</p>
	<pre>
    <code bash>
      $ airship init
      Package name (default: home): HelloWorld
      Initialize package in current folder: "C:/Users/home"? (Y/n): n
      Folder name (default: HelloWorld): HelloWorld
      Package version (default: 0.1.0): 0.1.0
      Package description: Flat Hello World program
      Package author: Your Name
      Package license (default: ISC): ISC
      Default compilation target (default: es6): es6
      Main class (e.g.: example/ClassName) [optional - press enter to skip]: HelloWorld
      Create a testing pipeline? (Y/n): y
      Pipeline file (default: .github/workflows/test.yml):
      Pipeline file created at "C:/Users/home/HelloWorld/.github/workflows/test.yml"
    </code>
  </pre>
	<p>
		Once the initialization is finished, you should see a file with these contents at
		"HelloWorld/src/HelloWorld.flat":
	</p>
	<pre>
    <code>
      {`
        class {
          public static main(String[] args) {

          }
        }
      `}
    </code>
  </pre>
	<p>
		Now you can add a console logging statement to the main function like this:
	</p>
	<pre>
    <code>
      {`
        class {
          public static main(String[] args) {
            Console.writeLine("Hello, world!")
          }
        }
      `}
    </code>
  </pre>
	<p>
		Now you need to install the Flat IO package so that we can use that Console library:
	</p>
	<pre>
    <code bash>
      airship add github:FlatLang/IO
    </code>
  </pre>
  <p>
    Now you can install the HelloWorld program:
  </p>
	<pre>
    <code bash>
      airship install
    </code>
  </pre>
	<p>
		You should see a new js file generated at <code bash>HelloWorld/dist/index.js</code>
	</p>
	<p>You can now run the HelloWorld program:</p>
	<pre>
    <code bash>
      node dist/index.js
    </code>
  </pre>
	<p>And you should see this logged out into to the console:</p>
	<pre>
    <code bash>
      Hello, world!
    </code>
  </pre>
</template>
