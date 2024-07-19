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
	gameboard: Array(9).fill(null),
	player: [],
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
		Gameboard.gameboard.map((value, i) => {
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
				child.innerHTML = marker	
			}
		})
	})
}

const card = document.querySelector(".card")
const heading = document.querySelector(".winner")
const desc = document.querySelector(".desc")

const displayWinner = (winner) => {
	const possibilites = [
		{
			title: "Congratulations!",
			desc: "Player X wins.",
			counter: document.querySelector(".wins-count")
		},
		{
			title: "Congratulations!",
			desc: "Player O wins.",
			counter: document.querySelector(".losses-count")
		},
		{
			title: "It's a Tie!",
			desc: "Nobody won. Try again.",
			counter: document.querySelector(".ties-count")
		}
	]
	card.style.transform = "translateY(0)"
	heading.textContent = possibilites[winner].title
	desc.textContent = possibilites[winner].desc
	possibilites[winner].counter.textContent = Number(possibilites[winner].counter.textContent) + 1
	Gameboard.gameboard = Array(9).fill(null)
	executed = true
}


children.forEach((el, index) => {
	el.addEventListener("click", () => {
		if(Gameboard.gameboard[index] === null) {
			Gameboard.isMarkerX = !Gameboard.isMarkerX
			Gameboard.gameboard[index] = Gameboard.isMarkerX ? "X" : "O"
			displayGameboard()
			checkWinner()
		}
	})
})

let executed = false
const checkWinner = () => {
	// create an array that includes the indices of every field that has been marked
	const listX = []
	const listO = []
	const checkGameboard = (List, Marker, marker, index) => {
		if(marker === Marker && !List.includes(index)) {
			List.push(index)
		}
	}

	Gameboard.winCondition.map(condition => {
		Gameboard.gameboard.map((marker, index) => {
			checkGameboard(listX, "X", marker, index)
			checkGameboard(listO, "O", marker, index)

			const xWins = condition.every(el => listX.includes(el))
			const oWins = condition.every(el => listO.includes(el))
			const tie = Gameboard.gameboard.every(marker => marker !== null)
			xWins && !executed && displayWinner(0)
			oWins && !executed && displayWinner(1)
			tie && displayWinner(2)
		})
	})
}

document.querySelector(".reload").addEventListener("click", () => {
	card.style.transform = "translateY(-100vh)";
	children.forEach(el => {
		el.innerHTML = ""
	})
	executed = false
})