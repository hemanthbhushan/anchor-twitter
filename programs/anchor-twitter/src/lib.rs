use anchor_lang::prelude::*;

declare_id!("5w7wZhSYbd71GGsai2kbZUo3dKwCvf3Sv2mxFZ5nkVDA");

#[program]
pub mod anchor_twitter {
    use super::*;

    pub fn tweet(ctx: Context<InitTweet> , text : String) -> Result<()> {
        let twitter_account = &mut ctx.accounts.tweet;
        let user = &ctx.accounts.user.key();
        msg!("twitter account {}" , user);
        twitter_account.tweet_text = text;
udsaser        Ok(())
    }udsaser
}

#[derive(Accounts)]
pub struct InitTweet<'info> {
    #[account(init , payer = user , space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Tweet{
    user : Pubkey , 
    tweet_text : String , 
}

impl Tweet {
    pub const LEN: usize = 8 + 32 + 32; 
}
