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

router.get('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userParties = await Group_Member.findAll({
            where: { user_id: userId },
            include: { model: Room_Dialogue },
            // include: [
            //     { model: Room_Dialogue },
            //     { model: Party },
            // ]
        });
        console.log('userParties: ==========', userParties);

        if (userParties && userParties.length >  0) {
            const partyIds = userParties.map(userParty => userParty.Room_Dialogue.party_id);
            const parties = await Party.findAll({ where: { id: partyIds } });
            userParties[0].dataValues.parties = parties;
            res.json(parties);
            return;
        } else {
            res.json({ message: 'No user parties found' });
        }
        
    } catch ({ message }) {
        res.json({ message: 'Error while reading user parties'})
    }
})

router.get('/parties/:userId', async (req, res) => {
    // try {
    //     const { userId } = req.params;
    //     const groupsMember = await Group_Member.findAll({
    //         where: { user_id: userId },
    //         include: { model: Room_Dialogue },
    //     })
    //     const rooms = groupsMember.map(member => member.Room_Dialogue);
    //     console.log('rooms: ', rooms);
    //     res.json(rooms);
        
    // } catch ({ message }) {
    //     res.json({ message: 'Error while reading user chats' })
    // }

    try {
        const { userId } = req.params;
        const userParties = await Group_Member.findAll({
            where: { user_id: userId },
            include: { model: Room_Dialogue },
        });

        if (userParties && userParties.length > 0) {
            const partyIds = userParties.map(userParty => userParty.Room_Dialogue.party_id);
            const parties = await Party.findAll({ where: { id: partyIds } });

            const partiesWithRoomIds = parties.map(party => {
                const userParty = userParties.find(userParty => userParty.Room_Dialogue.party_id === party.id);
                if (userParty) {
                    return {
                        ...party.dataValues,
                        room_id: userParty.Room_Dialogue.id,
                    };
                }
                return party;
            });
            console.log('partiesWithRoomIds: ======', partiesWithRoomIds);
            res.json(partiesWithRoomIds);
            return;
        } else {
            res.json({ message: 'No user parties found' })
        }
        
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

// router.delete('/roomdialogue/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const result = await Group_Member.destroy({ where: { user_id: userId } })
//         // if (result > 0) {
//         //     res.json({ message: 'success' })
//         // }

//         const userParties = await Group_Member.findAll({
//             where: { user_id: userId },
//             include: { model: Room_Dialogue },
//         });
//         console.log('userParties: ==========', userParties);

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
//         res.json({ message: 'Error while deleting user from room' })
//     }
// })

module.exports = router