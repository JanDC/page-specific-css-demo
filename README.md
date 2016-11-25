# page-specific-css-site
Demo site to demostrate the usage of the twig wrapper provider and the page specific css library


A typical setup would consist of these steps:
- Register the twig extension in your environment, providing your main css file.
- Use the ‘fold’/’endfold’ tags to annotate the critical regions in your template.
While parsing the tags, css rules from the resulting html will be computed and stored in memory
- From here on you can access the combined set of css rules from the library and proceed to either:
    - Dump the css somewhere on filesystem for you to use.
    - Use the critical css post processor to insert the css to your document (by twig wrapper)
