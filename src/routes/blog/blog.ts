import { writable } from 'svelte/store'

const blogPages = [{
    header: "Flat Compiler Design",
    url: "compiler-design",
    date: "2/18/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Multiple Targets",
    url: "multiple-targets",
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
    date: "2/21/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Thread-Local Storage",
    url: "thread-local-storage",
    date: "2/22/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Flat Won't Have Yield",
    url: "no-yield",
    date: "2/23/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Flat Exception Handling",
    url: "exception-handling",
    date: "2/24/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Automated API Importing",
    url: "automated-api-importing",
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
    date: "3/1/2017",
    // author: "Braden Steffaniak"
}, {
    header: "Flat Path Forward",
    url: "path-forward",
    date: "3/2/2017",
    author: "Braden Steffaniak"
}, {
    header: "Flat Unit Testing",
    url: "flat-unit-testing",
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

blogPages.forEach(page => page.dateObj = new Date(page.date));

const currentPage = writable<any>(null);

export { blogPages, currentPage };