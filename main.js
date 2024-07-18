const children = document.querySelectorAll(".children");

const markerX = `
<svg viewBox="0 0 170 170"  width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="10" x2="160" y2="160" style="stroke:#163A5F; stroke-width:15" />
    <line class="line-2" x1="160" y1="10" x2="10" y2="160" style="stroke:#163A5F; stroke-width:15" />
</svg>`
const markerO = `
<svg  viewBox="0 0 170 170"  width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
	<circle cx="50%" cy="50%" r="75" stroke="#21ABA5" stroke-width="15 fill="transparent" />
</svg>`
		
const Gameboard = {
	gameboard: [],
	player: []
}

let isMarkerX = false
const handleClick = () => {
    const markedField = (number, marker) => {
        return { number, marker }
    }

    const displayMarker = (el, marker) => {
        el.innerHTML = ""
        let element = document.createElement("div")
        element.innerHTML = marker
        el.insertAdjacentElement("beforeend", element)
    }

    children.forEach((el, index) => {
        if(!list.includes(index + 1)) {
            isMarkerX ? !isMarkerX : isMarkerX
            
            let currentField = markedField(index + 1, letterMarker)
		    Gameboard.gameboard.push(currentField)
            displayMarker(el, currentMarker)

            gameEnd()
            list.push(index + 1)
        }
    })
}

let currentMarker = markerO;
let letterMarker = "O";
let list = [];

children.forEach((el, index) => {
	el.addEventListener("click", function renderData() {
		let currentNumber = el.getAttribute("data-number");	
		if(list.includes(currentNumber) == false) {
			const markedField = (number, marker) => {
				return { number, marker }
			}

		if(currentMarker == markerO) {
			currentMarker = markerX
		} else {
			currentMarker = markerO
		}
		if(letterMarker == "O") {
			letterMarker = "X";
		} else {
			letterMarker = "O";
		};

		let currentField = markedField(currentNumber, letterMarker)
		Gameboard.gameboard.push(currentField);
		console.log(Gameboard.gameboard);
		//Gameboard.gameboard.map(({marker}) => {
			el.innerHTML = "";
			let element = document.createElement("div");
			element.innerHTML = `<p class="element">${currentMarker}</p>`
			el.insertAdjacentElement("beforeend", element)
		//})
		gameEnd()
		list.push(currentNumber);
	}})
});
		
let listX = [];
let listO = [];
let uniqueO;
let uniqueX;
const card = document.querySelector(".card");
const desc = document.querySelector(".desc");
const heading = document.querySelector(".winner");

function gameEnd() {
	let booleanO;
	let booleanX;
	let winCondition = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]]
	let result = Gameboard.gameboard.filter(obj => {
			if(obj.marker == "X" === true) {
				listX.push(obj.number)
			listX.sort(function(a, b){return a-b})
			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index;
			}
			uniqueX = listX.filter(onlyUnique);	
			
			function includes(a, b) {
					if(uniqueX.includes(a[0]) && uniqueX.includes(a[1]) && uniqueX.includes(a[2]) == true) {
						card.style.transform = "translateY(0)";
					heading.innerHTML = "Congratulations";
					desc.innerHTML = "Player X wins. Better luck next time.";
					booleanX = true;
					}
			}

			winCondition.map(item => {
					includes(item, uniqueX)
			})

			} else if(obj.marker == "O" == true) {
			listO.push(obj.number)
			listO.sort(function(a, b){return a-b})
			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index;
			}
			uniqueO = listO.filter(onlyUnique);	
			
			function includes(a, b) {
					if(uniqueO.includes(a[0]) && uniqueO.includes(a[1]) && uniqueO.includes(a[2]) == true) {
						card.style.transform = "translateY(0)";
					heading.innerHTML = "Congratulations"
					desc.innerHTML = "Player O wins. Better luck next time.";
					booleanO = true;
					}
			}

			winCondition.map(item => {
					includes(item, uniqueO)
			})
		}
	})
	if(Gameboard.gameboard.length == 9 && booleanX == true == false && booleanO == true == false) {
		card.style.transform = "translateY(0)";
		heading.innerHTML = "Tie"
		desc.innerHTML = "Nobody won. Try again and see who is better.";
	}
}

document.querySelector(".reload").addEventListener("click", function() {
	card.style.transform = "translateY(-100vh)";
	children.forEach(el => {
		el.innerHTML = "";
	})
	Gameboard.gameboard.length = 0;
	listO.splice(0, listO.length);
	listX.splice(0, listX.length);
	list.length = 0;
})