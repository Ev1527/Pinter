const router = require('express').Router();
const bcrypt = require("bcrypt");
const { User, Party, Room_Dialogue, Group_Member } = require('../../db/models');
const generateTokens = require("../../utils/authUtils");
const cookiesConfig = require("../../config/cookiesConfig");

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users)
        
    } catch ({ message }) {
        res.json({ message: 'Error while reading users' });
    }
})

// router.get('/profile/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const userParties = await Group_Member.findAll({
//             where: { user_id: userId },
//             include: { model: Room_Dialogue },
//         });
//         // console.log('userParties: ==========', userParties);

//         if (userParties && userParties.length >  0) {
//             const partyIds = userParties.map(userParty => userParty.Room_Dialogue.party_id);
//             const parties = await Party.findAll({ where: { id: partyIds } });
//             userParties[0].dataValues.parties = parties;
//             res.json(parties);
//             return;
//         } else {
//             res.json({ message: 'No user parties found' });
//         }
        
//     } catch ({ message }) {
//         res.json({ message: 'Error while reading user parties'})
//     }
// })

router.get('/parties/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const userParties = await Group_Member.findAll({
            where: { user_id: userId },
            include: { model: Room_Dialogue },
        });

        const rooms = userParties.map(userParty => {
            return userParty.Room_Dialogue;
        });

        const roomIds = rooms.map(room => room.id);
        const userPartyRooms = await Room_Dialogue.findAll({
            where: { id: roomIds },
            include: { model: Party },
        })

        res.json(userPartyRooms);
        

        // if (userParties && userParties.length > 0) {
        //     const partyIds = userParties.map(userParty => userParty.Room_Dialogue.party_id);
        //     const parties = await Party.findAll({ where: { id: partyIds } });

        //     const partiesWithRoomIds = parties.map(party => {
        //         const userParty = userParties.find(userParty => userParty.Room_Dialogue.party_id === party.id);
        //         if (userParty) {
        //             return {
        //                 ...party.dataValues,
        //                 room_id: userParty.Room_Dialogue.id,
        //             };
        //         }
        //         return party;
        //     });
        //     // console.log('partiesWithRoomIds: ======', partiesWithRoomIds);
        //     res.json(partiesWithRoomIds);
        //     return;
        // } else {
        //     res.json({ message: 'No user parties found' })
        // }
        
    } catch ({ message }) {
        res.json({ message: 'Error while reading user parties' })
    }
})

router.put('/profile', async (req, res) => {
    const { id, name, email, password } = req.body.data;
    // console.log('========', req.body.data);
    
    try {
        const user = await User.findOne ({ where: { id } });
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            const hash = await bcrypt.hash(password, 10);
            const userUpd = await User.update({ name, email, password: hash }, { where: { id } });
            if (userUpd.length > 0) {
                const user = await User.findOne({ where: { id }});

                const { accessToken, refreshToken } = generateTokens({
                    user: { id: user.id, email: user.email, name: user.name, password: user.password },
                  });
                res
                    .clearCookie(cookiesConfig.refresh)
                    .clearCookie(cookiesConfig.access)
                    .cookie(cookiesConfig.refresh, refreshToken, {
                        maxAge: cookiesConfig.maxAgeRefresh,
                        httpOnly: true,
                    })
                    .cookie(cookiesConfig.access, accessToken, {
                        maxAge: cookiesConfig.maxAgeAccess,
                        httpOnly: true,
                    })
                    .status(201)
                    .json(user);
                return;
            }

        } else {
            const userUpd = await User.update( { name, email }, { where: { id } });
            if (userUpd.length > 0) {
                const user = await User.findOne({ where: { id }});

                const { accessToken, refreshToken } = generateTokens({
                    user: { id: user.id, email: user.email, name: user.name, password: user.password },
                  });

                res
                    .clearCookie(cookiesConfig.refresh)
                    .clearCookie(cookiesConfig.access)
                    .cookie(cookiesConfig.refresh, refreshToken, {
                        maxAge: cookiesConfig.maxAgeRefresh,
                        httpOnly: true,
                    })
                    .cookie(cookiesConfig.access, accessToken, {
                        maxAge: cookiesConfig.maxAgeAccess,
                        httpOnly: true,
                    })
                    .status(201)
                    .json(user);
                return;
            }
        }
        
    } catch ({ message }) {
        res.json({ message: 'Error while updating user' });
    }
})

router.delete('/room/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room_Dialogue.findOne({ where: { id: roomId } })
        const result = await Group_Member.destroy({ where: { user_id: res.locals.user.id, room_dialogue_id: roomId } })
        const result2 = await Access_Table.destroy({ where: { user_id: res.locals.user.id, room_token: room.token } })
        
        console.log('room ', room);
        console.log('result ', result);
        console.log('result2 ', result2);

        if (result > 0 && result2 > 0) {
            res.json(roomId)
            return
        }
        
    } catch ({ message }) {
        res.json({ message: 'Error while deleting user from room' })
    }
})

module.exports = router