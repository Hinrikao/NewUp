/*
Exemplo matriz Levenshtein
	    [j]    ""   A   L   B   E   R   O > T
	┌─────────┬───┬───┬───┬───┬───┬───┬───┐
 S	│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │
 \/	├─────────┼───┼───┼───┼───┼───┼───┼───┤
 ""	│    0    │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │
 L	│    1    │ 1 │ 1 │ 1 │ 2 │ 3 │ 4 │ 5 │
 I	│    2    │ 2 │ 2 │ 2 │ 2 │ 3 │ 4 │ 5 │
 B	│    3    │ 3 │ 3 │ 3 │ 2 │ 3 │ 4 │ 5 │
 R	│    4    │ 4 │ 4 │ 4 │ 3 │ 3 │ 3 │ 4 │
 O	│    5    │ 5 │ 5 │ 5 │ 4 │ 4 │ 4 │ 3 │
[i]	└─────────┴───┴───┴───┴───┴───┴───┴───┘
A iteração vai da esquerda->direita - topo->base

considerando os custos:
inserir : 1
remover : 1
substituir : 1
nenhum : 0
*/

/**
 * Determina a distância Levenshtein entre duas strings fornecidas
 * @param {String} string 
 * @param {String} string
 * @returns {Number}
 */
const levDistance = (S = '', T = '') => {
	// índices iteradores
	let i, j;
	const n = S.length, m = T.length;
	// cria um array bidimensional ([n][m]) mapeando para cada slot do array inicial (n) outro array (m)
	let lev = Array(n + 1).fill().map(() => Array(m + 1).fill());

	// considere o `i` como o índice para a string vertical
	// considere o `j` como o índice para a string horizontal
	for (i = 0; i < n + 1; i++) {
		for (j = 0; j < m + 1; j++) {
			if (i == 0 || j == 0) {
				lev[i][j] = Math.max(i, j); // célula inicial para a linha || coluna
			} else {
				// define a distância em uma célula de acordo com a edição mínima necessária para transformar uma string em outra
				lev[i][j] = Math.min(
					// qual é o mínimo /* entre */ (inserção, remoção, substituição) custos
					lev[i - 1][j] + 1, lev[i][j - 1] + 1, lev[i - 1][j - 1] + (S.charAt(i - 1) != T.charAt(j - 1) ? 1 : 0)// custo de substituição
				);
			}
		}
	}
	return lev[n][m];
}

/**
* obtém a ocorrência do `index` do `subString` em uma `string`
* @param {String} string String na qual encontrar o caractere `n-ésimo`
* @param {String} subString o caractere para procurar o índice
* @param {Number} index a ocorrência do caractere que você deseja procurar, padrão é `1`
* @returns {Number}
* se o `subString` não for encontrado, retorna o comprimento da string
*/
function getPosition(string, subString, index = 1) {
	return string.toString().split(subString, index).join(subString).length;
}

/**
 * Capitaliza a primeira letra de uma string (se for uma letra)
 * @param {String} string 
 * @returns {String}
 */
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

/**
 * Substitui espaços reservados em uma string por dados
 * @param {String} string a string para substituir espaços reservados 
 * @param {JSON} data os dados para substituir os espaços reservados 
 * @param {String} format o formato do espaço reservado 
 * @param {String} placeholder o espaço reservado para substituir 
 * @returns {String} a string com os espaços reservados substituídos
 */
function format(string, data = {}, format = "{%}", placeholder = "%") {
	for (const key in data) {
		string = string.replace(format.replace(placeholder, key), data[key]);
	}
	return string;
}

module.exports = {
	getPosition,
	levDistance,
	capitalize,
	format
}

/**
 * eu peguei de https://github.com/wtfnotavailable/Discord-MusicBot
 */