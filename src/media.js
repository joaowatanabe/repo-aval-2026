import { MEDIA_APROVACAO, MEDIA_RECUPERACAO, NOTA_MAXIMA, NOTA_MINIMA, MEDIA_DISTINCAO } from './config.js';

/**
 * Indica se o valor é uma nota válida: um número entre NOTA_MINIMA e NOTA_MAXIMA.
 *
 * @param {unknown} nota
 * @returns {boolean}
 */
export function ehNotaValida(nota) {
  return typeof nota === 'number' && nota >= NOTA_MINIMA && nota <= NOTA_MAXIMA;
}

/**
 * Calcula a média aritmética de uma lista de notas.
 *
 * @param {number[]} notas
 * @returns {number}
 */
export function calcularMedia(notas) {
  // Mantém a validação inicial exatamente igual
  if (!Array.isArray(notas) || notas.length === 0) {
    throw new Error('Informe ao menos uma nota.');
  }

  // Usa findIndex para achar a POSIÇÃO da primeira nota inválida
  const indiceInvalido = notas.findIndex(nota => !ehNotaValida(nota));

  // Se encontrou algo (índice diferente de -1), dispara o erro idêntico ao original
  if (indiceInvalido !== -1) {
    throw new Error(`Nota inválida: ${notas[indiceInvalido]}. Use valores entre ${NOTA_MINIMA} e ${NOTA_MAXIMA}.`);
  }

  // Usa reduce para somar todas as notas
  const soma = notas.reduce((acc, nota) => acc + nota, 0);

  return soma / notas.length;
}

/**
 * Retorna a situação do aluno de acordo com a média.
 *
 * @param {number} media
 * @returns {string} "Aprovado", "Recuperação" ou "Reprovado"
 */
export function obterSituacao(media) {
  if (media >= MEDIA_APROVACAO) {
    return 'Aprovado';
  }

  if (media >= MEDIA_RECUPERACAO) {
    return 'Recuperação';
  }

  if (media >= MEDIA_DISTINCAO) {
    return 'Aprovado com distinção';
  }

  return 'Reprovado';
}
