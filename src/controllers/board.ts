import Board from "../models/board/board";

export const findBoardByName = async (name: string) => {
	const board = await Board.findOne({
		boardName: name
	})
	return board;
}
