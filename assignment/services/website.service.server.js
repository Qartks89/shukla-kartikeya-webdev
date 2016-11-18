module.exports = function (app, model) {

    // var websites = [
    //     { "_id": 123, "name": "Facebook",    "developerId": "456", "desc" : "Facebook" },
    //     { "_id": 234, "name": "Tweeter",     "developerId": "456", "desc" : "Tweetster" },
    //     { "_id": 456, "name": "Gizmodo",     "developerId": "456", "desc" : "Gizmo" },
    //     { "_id": 567, "name": "Tic Tac Toe", "developerId": "123", "desc" : "Tic" },
    //     { "_id": 678, "name": "Checkers",    "developerId": "123", "desc" : "Check" },
    //     { "_id": 789, "name": "Chess",       "developerId": "234", "desc" : "Chess Site" },
    //     { "_id": 790, "name": "Mega Chess",  "developerId": "234", "desc" : "Mega Chess Site" },
    //     { "_id": 791, "name": "Meta-Chess",  "developerId": "234", "desc" : "Chessy Chess Site" }
    // ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        model.websiteModel.findAllWebsitesForUser(userId)
            .then( function (websites) {
                res.send(websites);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        model.websiteModel.createWebsiteForUser(userId, website)
            .then( function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model.websiteModel.findWebsiteById(websiteId)
            .then( function (website) {
                if (website) {
                    res.send(website);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        model.websiteModel.updateWebsite(websiteId, website)
            .then( function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        model.websiteModel.deleteWebsite(websiteId)
            .then(function (website) {
                if (website) {
                    res.sendStatus(200);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

}