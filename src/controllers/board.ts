import Board from "../models/board/board";
import Ticket from "../models/ticket/ticket";
import Column from "../models/column/column";

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
};

export const updateTicket = async (ticketId: string, newColumnId: string) => {
	const ticket = await Ticket.findOne({ _id: ticketId })

	if (ticket) {
		const newColumn = await Column.findOne({ _id: newColumnId });
		const oldColumn = await Column.findOne({ _id: ticket.column});

		if (newColumn) {
			ticket.column = newColumn._id;
			await ticket.save();

			newColumn.tickets.push(ticket);
			await newColumn.save();


			if (oldColumn) {
				const tempArray = oldColumn.tickets.filter((ticket: any) => ticket._id != ticketId);
				oldColumn.tickets = tempArray
				await oldColumn.save();

				return true;
			}
		}
	}

	return false;
}

export const findColumnById = (id: string) => {
	return Board.findOne({
		_id: id
	});
};