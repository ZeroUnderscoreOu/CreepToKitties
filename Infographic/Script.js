var LinkAPI = "https://api.cryptokitties.co/";
fetch(LinkAPI+"kitties?limit=1").then((Data)=>(Data.json())).then((Data)=>{
	let Population = Data.total / 100; // so I don't have to multiply each time in forEach()
	fetch(LinkAPI+"cattributes?total=true").then((Data)=>(Data.json())).then((Data)=>{
		let Stats = new Array(101).fill(0).map(()=>([0,0])); // up to index 100
		let Types = {};
		let FragmentPopulation = new DocumentFragment();
		let FragmentCattributes = new DocumentFragment();
		let FragmentTypes = new DocumentFragment();
		Data.forEach((Cattribute)=>{
			Cattribute.total = parseInt(Cattribute.total,10);
			let Percent = Math.round(Cattribute.total/Population);
			if (Percent==0) { // grouping 0% & 1%
				Percent = 1;
			};
			Stats[Percent][0]++; // cattributes distribution
			Stats[Percent][1] += Cattribute.total; // population distribution
			Types[Cattribute.type] = Types[Cattribute.type] ? ++Types[Cattribute.type] : 1;
		});
		Stats.forEach((Data,Index)=>{
			let Div = document.createElement("Div");
			Div.style.height = `${Data[0]*10}px`;
			Div.dataset.after = Index;
			FragmentCattributes.appendChild(Div);
			Div = document.createElement("Div");
			Div.style.height = `${Math.round(Data[1]/2000)}px`;
			Div.dataset.after = Index;
			FragmentPopulation.appendChild(Div);
		});
		Object.entries(Types).forEach((Entry)=>{
			let Span = document.createElement("Span");
			Span.textContent = `${Entry[0]}: ${Entry[1]}`;
			FragmentTypes.append(Span);
		});
		document.getElementsByClassName("Stats")[0].append(FragmentPopulation);
		document.getElementsByClassName("Stats")[1].append(FragmentCattributes);
		document.getElementsByClassName("Stats")[2].append(FragmentTypes);
	});
}).catch((Message)=>{console.error("Infographic error",Message);});