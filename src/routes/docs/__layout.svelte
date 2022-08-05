<script>
  import TreeBrowser from '/src/components/TreeBrowser.svelte';

  let data = [{
      header: "Class types",
      url: "class-types",
      children: [{
          header: "Classes",
          url: "classes",
          references: ["traits", "interfaces"],
          children: []
      }, {
          header: "Interfaces",
          url: "interfaces",
          references: ["traits", "classes"],
          children: []
      }, {
          header: "Traits",
          url: "traits",
          references: ["classes", "interfaces"],
          children: []
      }]
  }, {
      header: "Data structures",
      url: "data-structures",
      references: ["data-structures/lists"],
      children: [{
          header: "Lists",
          url: "lists",
          tooltip: "Fundamental collection datatype",
          references: ["arrays"]
      }, {
          header: "Arrays",
          url: "arrays",
          references: ["lists"]
      }]
  }, {
      header: "Getting started",
      url: "getting-started",
      children: [{
          header: "Configure environment",
          url: "configure-environment",
          controller: "ConfigureEnvironmentController",
          css: "/docs/getting-started/configure-environment.css",
          references: [],
          children: []
      }, {
          header: "Hello world",
          url: "hello-world",
          references: [{
              header: "Downloading flat",
              url: "/download({ '#': 'downloads' })"
          }, {
              header: "Setting environment variables",
              url: "configure-environment"
          }],
          children: []
      }]
  }];
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="/styles/docs.css" />
  <link rel="stylesheet" type="text/css" href="/styles/blog-styles.css" />
</svelte:head>

<style>
  .flat-text-container {
      margin-top: 20px;
  }
</style>

<main>
  <div class="container">
      <div class="navigation dark-background">
          <div class="logo-container">
              <a href="/">
                  <img style="max-width: 20vw;" class="logo glow-logo" src="/images/hex-f-plain.svg" />
              </a>

              <div class="flat-text-container">
                  <a href="/">
                      <h1 class="flat-text" style="color: rgba(0,0,0,0);">FLAT</h1>
                      <h1 class="flat-text">FLAT</h1>
                  </a>
              </div>

              <a href="/">
                  <h1 class="return-home">RETURN HOME</h1>
              </a>
              <TreeBrowser class="page-browser" data={data} urlPrefix="/docs"></TreeBrowser>

              <div class="tree-browser root">
                <div ng-repeat="item in data | orderBy:'-children.length'" class="tree-item">
                    <table ng-click="toggle(item, false)">
                        <tr>
                            <td class="arrow-container">
                                <div class="arrow"></div>
                            </td>
                            <td class="link-container">
                                <a ng-click="toggle(item, true); $event.stopPropagation();" class="link" href="/docs/data-structures/lists">Lists</a>
                            </td>
                        </tr>
                    </table>
                    <div class="tree-browser">
                      <div ng-repeat="item in data | orderBy:'-children.length'" class="tree-item">
                          <table ng-click="toggle(item, false)">
                              <tr>
                                  <td class="arrow-container">
                                      <div class="arrow"></div>
                                  </td>
                                  <td class="link-container">
                                      <a ng-click="toggle(item, true); $event.stopPropagation();" class="link" href="/docs/class-types">Class Types</a>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div class="content white-background">
          <div class="content-header-container dark-border">
              <table>
                  <tr>
                      <td>
                          <div class="header-container">
                              <h1 class="content-header"></h1>
                              <h2 class="content-subheader"></h2>
                          </div>
                      </td>
                      <td class="export-options">
                          <h2 class="share-link nowrap" share>SHARE PAGE <img class="share" src="/images/share.svg" /></h2>
                      </td>
                  </tr>
              </table>
          </div>
          <div class="content-view-container">
              <div class="content-view">
                  <div class="view">
                    <slot></slot>
                  </div>
              </div>
              <div class="references dark-border" ng-if="page.references && page.references.length > 0">
                  <h2>References</h2>
                  <ul class="references-list">
                      <li>
                          <a ng-bind="ref.header"></a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</main>