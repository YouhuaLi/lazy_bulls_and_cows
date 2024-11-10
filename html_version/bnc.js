var counter=0;

function initSecretNumber(digits) {
    function getPermutations(arr, length) {
        if (length === 1) return arr.map(item => [item]);

        const result = [];
        arr.forEach((current, index) => {
            const remaining = arr.slice(0, index).concat(arr.slice(index + 1));
            const smallerPermutations = getPermutations(remaining, length - 1);
            smallerPermutations.forEach(perm => {
                result.push([current].concat(perm));
            });
        });

        return result;
    }

    const numbers = Array.from({ length: 10 }, (_, i) => i);
    return getPermutations(numbers, digits);
}

function getBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;

    // 计算 bulls：位置和数字都相同的数量
    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            bulls++;
        }
    }

    // 计算 cows：位置不同但数字相同的数量
    const secretCount = {};
    const guessCount = {};

    // 统计 secret 中每个数字的出现次数
    for (let digit of secret) {
        secretCount[digit] = (secretCount[digit] || 0) + 1;
    }

    // 统计 guess 中每个数字的出现次数
    for (let digit of guess) {
        guessCount[digit] = (guessCount[digit] || 0) + 1;
    }

    // 对每个在 guess 中出现的数字，取其在 secret 和 guess 中出现次数的最小值，并累加到 cows
    for (let digit in guessCount) {
        if (secretCount[digit]) {
            cows += Math.min(secretCount[digit], guessCount[digit]);
        }
    }

    // 减去 bulls，因为 bulls 也被包含在 cows 中
    cows -= bulls;

    return { bulls, cows };
}

function generateResponse(guess, availableNumbers) {
    var response = {};

    // 计算每个可用数字的 (bulls, cows) 并存储在 response 中
    for (const num of availableNumbers) {
		const { bulls, cows } = getBullsAndCows(num.join(''), guess);
        const key = `${bulls},${cows}`;

		if (guess === "85" && num.join('') === "85") {
        console.log("key:", key, "num:", num);
		}

        if (response[key] === undefined) {
            response[key] = [num];
        } else {
            response[key].push(num);
        }
    }

	// 找出出现次数最多的 (bulls, cows) 组合
	var maxCount = Math.max(...Object.values(response).map(arr => arr.length));

	var maxResponses = Object.entries(response)
		.filter(([_, value]) => value.length === maxCount)
		.map(([key, value]) => ({ key: key.split(',').map(Number), numbers: value }));

    //console.log("maxResponses:", maxResponses);

	// 随机选择一个最常出现的 (bulls, cows) 组合
	var chosenResponse = maxResponses[Math.floor(Math.random() * maxResponses.length)];

	// 更新 availableNumbers，只保留符合 chosenResponse 的数字
	var updatedAvailableNumbers = chosenResponse.numbers;
    //console.log("chosenResponse:", chosenResponse);
	return { chosenResponse: chosenResponse.key, updatedAvailableNumbers };

}


// 使用示例：设定digits，获取所有排列
const digits = 4;
var avaSecretNumbers = initSecretNumber(digits);
console.log(avaSecretNumbers);

function verifyEntry(number){
	number=number.toString();
	verif=true;
	for (var i=0;i<digits;i++){
		if (number.lastIndexOf(number.charAt(i))!=i){
			verif=false;
			break;
		}
	}
	return verif;
}


function check(){
	var userNumber=$("#try").val().toString();
	var cows=0;
	var bulls=0;
	var result;
	if (verifyEntry(userNumber)===false){$("#console").prepend(userNumber+" - 不正确的输入，请猜另一个数字。Invalid entry or duplicated number, please try again.\r\n")
	} else {
		result = generateResponse(userNumber, avaSecretNumbers);
		counter++;
		avaSecretNumbers = result.updatedAvailableNumbers;
		console.log("Updated Available Numbers:", avaSecretNumbers);
		bulls = result.chosenResponse[0];
		cows = result.chosenResponse[1];
		if (bulls===digits){
			$("#console").prepend(userNumber+ " - 全对了, 你一共猜了"+counter+"次。\r\n"+"你可以新开一局。\r\n\n");
			$("#console").prepend(userNumber+ " - all bulls, YOU WIN after "+counter+" tries.\r\n"+"A new number has been set, play again.\r\n");
			avaSecretNumbers = initSecretNumber(digits);
			counter=0;}
		else{
			$("#console").prepend("可能的数字/Available Numbers: "+avaSecretNumbers.length+"\r\n\n");
			$("#console").prepend(userNumber+ " - " + bulls + " bull(s), and " + cows +" cow(s), tries: "+counter+"\r\n");
		}
	}
}
