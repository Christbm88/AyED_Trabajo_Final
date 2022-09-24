function drawGraph(dotString) {
    let graphOptions = "node [fontsize=10 width=0.6 shape=circle style=filled fixedsize=shape] \n"
    let diagramText = "digraph G { \n" + dotString + "}";
    let viz = new Viz();

    viz.renderSVGElement("digraph G { " + graphOptions + dotString + "}")
        .then(function (element) {
            var parentTree = document.getElementById('KdTreeSvg');
            parentTree.outerHTML = element.outerHTML;
            let dotText = document.getElementById('DotText');
            dotText.innerText = diagramText;
        })
        .catch(error => {
            console.error(error);
        });
}