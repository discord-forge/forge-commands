import {Role} from "discord.js";
import {Argument, ChatEnvironment, Command, Permission, RestrictGroup, CommandContext, InternalArgType} from "@cloudrex/forge";

type MentionableArgs = {
    readonly role: Role;
}

export default class MentionableCommand extends Command {
    readonly meta = {
        name: "mentionable",
        description: "Toggle a role mentionable"
    };

    readonly arguments: Argument[] = [
        {
            name: "role",
            description: "The role to toggle mentionable",
            type: InternalArgType.Role,
            required: true
        }
    ];

    readonly restrict: any = {
        environment: ChatEnvironment.Guild,
        specific: [RestrictGroup.ServerOwner],
        selfPermissions: [Permission.ManageRoles]
    };

    // TODO: Add support by id
    public async executed(context: CommandContext, args: MentionableArgs): Promise<void> {
        await args.role.setMentionable(!args.role.mentionable);

        if (args.role.mentionable) {
            await context.ok(`Role <@${args.role.id}> is now mentionable.`);
        }
        else {
            await context.ok(`Role <@${args.role.id}> is no longer mentionable.`);
        }
    }
};