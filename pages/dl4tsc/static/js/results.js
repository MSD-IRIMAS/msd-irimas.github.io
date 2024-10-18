window.HELP_IMPROVE_VIDEOJS = false;

var IMAGES_BASE = "./static/";
var NUM_ARCHIS;
var archi_images = [];
var archi_names = [];
var archi_params = [];
var archi_titles = [];
var archi_papers = [];

// Function to preload information for the initial page
function preloadData() {
  // load extraction json file
  $.getJSON("static/jsons/extraction.json", function(data){
    
    $('#num-classifiers').empty().append(data.dl4tsc.length);

    for (var i=0; i<data.dl4tsc.length; i++){
      // load info
      archi_images[i] = new Image();
      archi_images[i].src = IMAGES_BASE + data.dl4tsc[i].image_src;
      archi_names[i] = data.dl4tsc[i].name;
      archi_params[i] = data.dl4tsc[i].number_of_params;
      archi_titles[i] = data.dl4tsc[i].title;
      archi_papers[i] = data.dl4tsc[i].paper;

      // Set corresponding radio buttons corresponding to models in the models section
      input_string = "<input class=\"form-check-input\" type=\"radio\" id=\"model-choice" + String(i+1) + "\" name=\"model-choice\" value=\"" + String(i);
      if (data.dl4tsc[i].name == 'H-InceptionTime') {
        input_string += "\" checked > ";
      }else{
        input_string += "\" > ";
      }
      $("#models-selection").append(input_string);
      label_string = "<label class=\"form-check-label\" for=\"model-choice" + String(i+1) + "\">" + data.dl4tsc[i].name + "</label>&emsp;&emsp;";
      $("#models-selection").append(label_string);

      // Set corresponding radio buttons corresponding to models in the results section
      // column 1
      $("#models-column1").append("<div class=\"form-check\">");
      input_string = "<input class=\"form-check-input\" type=\"radio\" id=\"model1-choice" + String(i+1) + "\" name=\"colRadioDefault1\" value=\"" + String(i);
      if (data.dl4tsc[i].name == 'InceptionTime') {
        input_string += "\" checked > ";
      }else if (data.dl4tsc[i].name == 'H-InceptionTime') {
        input_string += "\" disabled > ";
      }else{
        input_string += "\" > ";
      }
      $("#models-column1").append(input_string);
      label_string = "<label class=\"form-check-label\" for=\"model1-choice" + String(i+1) + "\">" + data.dl4tsc[i].name + "</label>";
      $("#models-column1").append(label_string);
      $("#models-column1").append("</div>");
      // column 2
      $("#models-column2").append("<div class=\"form-check\">");
      input_string = "<input class=\"form-check-input\" type=\"radio\" id=\"model2-choice" + String(i+1) + "\" name=\"colRadioDefault2\" value=\"" + String(i);
      if (data.dl4tsc[i].name == 'H-InceptionTime') {
        input_string += "\" checked > ";
      }else if (data.dl4tsc[i].name == 'InceptionTime') {
        input_string += "\" disabled > ";
      }else{
        input_string += "\" > ";
      }
      $("#models-column2").append(input_string);
      label_string = "<label class=\"form-check-label\" for=\"model2-choice" + String(i+1) + "\">" + data.dl4tsc[i].name + "</label>";
      $("#models-column2").append(label_string);
      $("#models-column2").append("</div>");
    }
  });
}

// Function to set the numbers to a specfic format

function ToScientificFormat(x){

  if (x < 1000){ return x; }
  else if (x > 1000 && x < 1000000){ return (x / 1000).toFixed(3) + 'K'; }
  else if (x > 1000000 && x < 1000000000){ return (x / 1000000).toFixed(3) + 'M'; }
  else if (x > 1000000000 && x < 1000000000000){ return (x / 1000000000).toFixed(3) + 'B'; }

}

// Function to set architecture's info according to the selected model
function setModelInfos(i) {
  var image = archi_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#model-architecture').empty().append(image);
  $('#num-params').empty().append(ToScientificFormat(archi_params[i]));
  $('#archi-title').empty().append(archi_titles[i]);
  $('#archi-paper').empty().append(archi_papers[i]);
}

// Function to set 1vs1 plot according to the two selected models
function set1vs1(j,i) {
  var name1 = archi_names[j];
  var name2 = archi_names[i];
  var img_1v1_path = IMAGES_BASE + 'images/1v1/' + name1 + '_vs_' + name2 + '.png';
  var image_1v1 = new Image();
  image_1v1.src = img_1v1_path;
  image_1v1.ondragstart = function() { return false; };
  image_1v1.oncontextmenu = function() { return false; };
  $('#bokeh-plot').empty().append('<iframe style=\"width: 100%; height: 500px; border: none\" src=\"static/bokeh/1v1_plots/'+name1+'_vs_'+name2+'.html\"></iframe>');
}

$(document).ready(function() {
    
    preloadData();

    $('#models-selection').click(function(event) {
      setModelInfos($('input:radio[name=model-choice]:checked').val());
    });

    $('#models-column1').click(function(event) {
      id_radio_string_to_enable = 'model2-choice' + String(parseInt($('input:radio[name=colRadioDefault2]:disabled').val())+1);
      $('#'+id_radio_string_to_enable).prop('disabled',false);
      set1vs1($('input:radio[name=colRadioDefault2]:checked').val(),$('input:radio[name=colRadioDefault1]:checked').val());
      id_radio_string_to_disable = 'model2-choice' + String(parseInt($('input:radio[name=colRadioDefault1]:checked').val())+1);
      $('#'+id_radio_string_to_disable).prop('disabled',true);
    });

    $('#models-column2').click(function(event) {
      id_radio_string_to_enable = 'model1-choice' + String(parseInt($('input:radio[name=colRadioDefault1]:disabled').val())+1);
      $('#'+id_radio_string_to_enable).prop('disabled',false);
      set1vs1($('input:radio[name=colRadioDefault2]:checked').val(),$('input:radio[name=colRadioDefault1]:checked').val());
      id_radio_string_to_disable = 'model1-choice' + String(parseInt($('input:radio[name=colRadioDefault2]:checked').val())+1);
      $('#'+id_radio_string_to_disable).prop('disabled',true);
    });


})

function chooseDataset() {

  $.getJSON("static/jsons/classes_per_dataset.json", function(data){

  var dropdown = document.getElementById("params-datasets");
  var selectedValue = dropdown.options[dropdown.selectedIndex].value;

  var my_iframe = document.getElementById("params-plot-iframe");
  var my_iframe_title = document.getElementById("params-title");
  const my_dataset_button = document.getElementById('myDatasetButton');
  var my_dataset_iframe = document.getElementById("datasetPlot");
  var my_dataset_iframe_title = document.getElementById("datasetPlotTitle");

  const selectClass = document.getElementById("plots-datasets-class");

  selectClass.innerHTML = '';

  if (selectedValue == "all-datasets"){
    my_iframe_title.textContent = "All Datasets";
    my_iframe.src = "static/images/params/num-params-plot.html";
    my_dataset_button.style.display = 'none';
  }
  else {
    my_iframe_title.textContent = selectedValue + " Dataset";
    my_iframe.src = "static/images/params/per_data/"+selectedValue+"/num-params-plot.html";
    my_dataset_button.style.display = 'inline-block';
    my_dataset_button.textContent = 'Button here';
    my_dataset_iframe_title.textContent = "Random Samples From The " + selectedValue + " Dataset" + " - " + data.numberOfClasses[selectedValue] + " Classes";
    my_dataset_iframe.src = "static/bokeh/dataset_plots/"+selectedValue+"/class_0.html";

    const dropdown_class = document.getElementById("plots-datasets-class");

    for (var i=0; i<data.numberOfClasses[selectedValue]; i++){
      const newOption = document.createElement('option');
      newOption.text = "Class " + i;
      newOption.value = i;
      dropdown_class.appendChild(newOption);
    }
  }

});
}

function chooseClassDataset(){

  const dropdown_class = document.getElementById("plots-datasets-class");
  const dropdown_dataset = document.getElementById("params-datasets");

  var selectedClass = dropdown_class.options[dropdown_class.selectedIndex].value;
  var selectedDataset = dropdown_dataset.options[dropdown_dataset.selectedIndex].value;

  var my_dataset_iframe = document.getElementById("datasetPlot");
  my_dataset_iframe.src = "static/bokeh/dataset_plots/"+selectedDataset+"/class_" + selectedClass + ".html";

}