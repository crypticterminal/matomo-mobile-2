var accounts = Alloy.Collections.appAccounts;
accounts.fetch();

var firstLogin = null;

if (accounts.hasAccount()) {

    showEntryScreen(accounts.lastUsedAccount());

} else {

    firstLogin = Alloy.createController('firstlogin');
    accounts.on('add', onCreatedAccount);
    firstLogin.open();
}

function onCreatedAccount(account) 
{
    accounts.off("add", onCreatedAccount);

    showEntryScreen(account);
    
    if (firstLogin) {
        firstLogin.close();
    }
}

function showEntryScreen(account)
{
    require('account').selectWebsite(account, openStatistics);
}

function openStatistics(siteModel, accountModel)
{
    require('session').setWebsite(siteModel, accountModel);
    
    var reportChooser = Alloy.createController('availablereports');
    reportChooser.open();
}