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
	player: [],
	state: Array(9).fill(null),
	isMarkerX: false,
	winCondition: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]	
}

const displayGameboard = () => {
	children.forEach((child, index) => {
		Gameboard.state.map((value, i) => {
			let marker = null
			const containsMarker = child.querySelector("svg") != null
			if(value === "X") {
				marker = markerX
			}
			if(value === "O") {
				marker = markerO
			}
			// only rerender if child does not already contain a marker
			if(index === i && containsMarker == false) {
				child.innerHTML = ""
				let element = document.createElement("div")
				element.innerHTML = marker
				child.insertAdjacentElement("beforeend", element)
			}
		})
	})
}

const card = document.querySelector(".card")
const heading = document.querySelector(".winner")
const desc = document.querySelector(".desc")

const displayWinner = (winner) => {
	card.style.transform = "translateY(0)"
	heading.innerHTML = "Congratulations"
	desc.innerText = "PlayerX wins."
	Gameboard.state = Array(9).fill(null)
}


children.forEach((el, index) => {
	el.addEventListener("click", () => {
		if(Gameboard.state[index] === null) {
			Gameboard.isMarkerX = !Gameboard.isMarkerX
			Gameboard.state[index] = Gameboard.isMarkerX ? "X" : "O"
			displayGameboard()
			checkWinner()
		}
	})
})

const checkWinner = () => {
	const listX = []
	const listO = []
	Gameboard.winCondition.map(condition => {
		Gameboard.state.map((marker, index) => {
			if(marker === "X" && !listX.includes(index)) {
				listX.push(index)
			} else if(marker === "O" && !listO.includes(index)) {
				listO.push(index)
			}

			const xWins = condition.every(el => listX.includes(el))
			const oWins = condition.every(el => listO.includes(el))
			const tie = Gameboard.state.every(marker => marker !== null)
			xWins && displayWinner(0)
			oWins && displayWinner(1)
			tie && displayWinner(2)
		})
	})
}

document.querySelector(".reload").addEventListener("click", function() {
	card.style.transform = "translateY(-100vh)";
	children.forEach(el => {
		el.innerHTML = "";
	})
})