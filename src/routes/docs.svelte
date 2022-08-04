<svelte:head>
  <link rel="stylesheet" type="text/css" href="/styles/docs.css" />
  <link rel="stylesheet" type="text/css" href="/styles/blog-styles.css" />
</svelte:head>

<script>
</script>

<main>
  <div class="container">
      <div class="navigation dark-background">
          <div class="logo-container">
              <a href="/">
                  <img style="max-width: 20vw;" class="logo glow-logo" src="images/hex-f-plain.svg" />
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
              <tree-browser class="page-browser" data="pages" url-prefix="docs."></tree-browser>
          </div>
      </div>
      <div class="content  white-background">
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
                  <div class="view" ui-view></div>
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

<style>


</style>
