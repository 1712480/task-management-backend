import Board from "../models/board/board";

export const findBoardByName = async (name: string) => {
	const board = await Board.findOne({
		boardName: name
	}).populate({
		path: 'columns',
		populate: {
			path: 'tickets'
		}
	});
	return board;
}
