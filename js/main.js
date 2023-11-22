(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const hotspotTemplate =document.querySelector("#hotspot");
  const materialTemplate = document.querySelector("#material");
  const materialList = document.querySelector("#material-list");
  const spinnerCon = document.querySelector("#spinnerCon");
  const spinner = ``;


  //functions

  //spinner

  function showSpinner() {
    spinnerCon.innerHTML = spinner;
  }

  function hideSpinner() {
    spinnerCon.innerHTML = "";
  }

  function hideError() {
    error.innerHTML ="";
  }


  
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }



  function loadInfoBoxes() {
    hideError()
    showSpinner()
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      
      .then(response => response.json())
      .then(infoBoxes => {
     
    infoBoxes.forEach((infoBox, index) => {
      
    let selected = document.querySelector(`#hotspot-${index+1}`);

      const clone = hotspotTemplate.content.cloneNode(true);

      const hotspotHeading = clone.querySelector(".hotspot-h");
      hotspotHeading.textContent = infoBox.heading;

      const hotspotDescription = clone.querySelector(".hotspot-d");
      hotspotDescription.textContent = infoBox.description; 

      const hotspotImage = clone.querySelector(".hotspot-image");
      hotspotImage.src = `images/${infoBox.thumbnail}`; 

      hideSpinner()
      selected.appendChild(clone);
    });
 
  })

  .catch(error => {
    console.error(error); //catch and report any errors
    showError()
  });
    
  }

  
  loadInfoBoxes();


  function loadMaterialInfo() {
    hideError()
    showSpinner()
    fetch("https://swiftpixel.com/earbud/api/materials")

    .then(response => response.json())
    .then(materialListData => {
    
    materialListData.forEach(material => {
      //clone template

      const clone = materialTemplate.content.cloneNode(true);

      //populate the clone template 
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading; 

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      hideSpinner()
      materialList.appendChild(clone); 
    });

  })
  
  .catch(error => {
    console.error(error); 
    showError()
  });
}

  loadMaterialInfo();




  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });



})();