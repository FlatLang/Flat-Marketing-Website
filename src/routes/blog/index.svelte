<div ng-if="!page" class="default-view" ng-init="limit = 50">
    <table class="recent-posts-header">
        <tr>
            <td>
                <h1>{ limit ? 'RECENT' : 'ALL' } POSTS <span ng-show="limit" class="show-all" ng-click="limit = false">Show all</span></h1>
            </td>
            <td class="search">
                <input type="text" ng-model="searchValue" placeholder="SEARCH POSTS" />
            </td>
        </tr>
    </table>
    <hr>
    <div class="post-list">
        {#each pages as page}
        <div class="post">
            <h3><a href="/blog/{page.url}"><span>{page.header}</span></a></h3>
            <h6><span class="date">{page.date}</span></h6>
        </div>
        {/each}
    </div>
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/styles/blog-home.css" />
</svelte:head>

<script>
    let limit;
    let page = {};

    let pages = [{
        header: "Flat Compiler Design",
        url: "compiler-design",
        css: "/Shared/styles/flow-boxes.css",
        date: "2/18/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Multiple Targets",
        url: "multiple-targets",
        css: "/Shared/styles/flow-boxes.css",
        date: "2/19/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Writing Target-Specific Code",
        url: "target-specific-code",
        date: "2/20/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Zero-Cost Primitive Generics",
        url: "zero-cost-primitive-generics",
        css: "/Shared/styles/flow-boxes.css",
        date: "2/21/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Thread-Local Storage",
        url: "thread-local-storage",
        css: "/Shared/styles/flow-boxes.css",
        date: "2/22/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Flat Won't Have Yield",
        url: "no-yield",
        css: "/Shared/styles/flow-boxes.css",
        date: "2/23/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Flat Exception Handling",
        url: "exception-handling",
        css: "/Shared/styles/flow-boxes.css",
        date: "2/24/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Automated API Importing",
        url: "automated-api-importing",
        css: "/Shared/styles/flow-boxes.css",
        date: "2/25/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "v0.3.7 Release Notes",
        url: "v0_3_7-release-notes",
        date: "2/26/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "First-Class Functions",
        url: "first-class-functions",
        date: "2/27/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Runtime Module Loading",
        url: "runtime-module-loading",
        date: "2/28/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Scalable Compiler Components",
        url: "scalable-compiler-components",
        css: ["/Shared/styles/flow-boxes.css", "/blog/scalable-compiler-components.css"],
        date: "3/1/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "Flat Path Forward",
        url: "path-forward",
        css: ["/Shared/styles/flow-boxes.css", "/blog/path-forward.css"],
        date: "3/2/2017",
        author: "Braden Steffaniak"
    }, {
        header: "Flat Unit Testing",
        url: "flat-unit-testing",
        css: ["/Shared/styles/flow-boxes.css"],
        date: "3/3/2017",
        visible: false,
        author: "Braden Steffaniak"
    }, {
        header: "v0.3.8 Release Notes",
        url: "v0_3_8-release-notes",
        date: "3/12/2017",
        // author: "Braden Steffaniak"
    }, {
        header: "v0.3.9 Release Notes",
        url: "v0_3_9-release-notes",
        date: "3/20/2017",
        visible: false,
        // author: "Braden Steffaniak"
    }];
</script>