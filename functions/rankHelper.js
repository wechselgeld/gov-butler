const { GuildMember } = require('discord.js');
const config = require('../config.json');

/**
 *
 * @param { string } number
 * @returns { number } 'Role ID'
 */
function resolveRoleId(number) {
	let roleId;

	switch (number) {
	case '0':
		roleId = '1033480843584348200';
		break;
	case '1':
		roleId = '1033480803558109224';
		break;
	case '2':
		roleId = '1033480722352177222';
		break;
	case '3':
		roleId = '1033480721190367255';
		break;
	case '4':
		roleId = '1033480720951283765';
		break;
	case '5':
		roleId = '1033480664676311070';
		break;
	case '6':
		roleId = '1033480663946494072';
		break;
	case '7':
		roleId = '1033480663296376832';
		break;
	case '8':
		roleId = '1033480592752382014';
		break;
	case '9':
		roleId = '1033480590315487262';
		break;
	case '10':
		roleId = '1033480523068231750';
		break;
	case '11':
		roleId = '1033480521843490837';
		break;
	case '12':
		roleId = '1033480449193935019';
		break;
	case '13':
		roleId = '1033480449915355318';
		break;
	case '14':
		roleId = '1033480448585768980';
		break;
	case '15':
		roleId = '1033480447419760770';
		break;
	case '16':
		roleId = '1033480052022726747';
		break;
	case '17':
		roleId = '1033480051351633990';
		break;
	case '18':
		roleId = '1033480007688933548';
		break;
	case '19':
		roleId = '1033480003255549986';
		break;
	case '20':
		roleId = '1048036798837837864';
		break;
	case '21-sod':
		roleId = '1033479028365086791';
		break;
	case '21-soi':
		roleId = '1033479029967298602';
		break;
	case '21-soj':
		roleId = '1033479029518503966';
		break;
	case '22':
		roleId = '1033478971708411965';
		break;
	case '23':
		roleId = '1033478971066683552';
		break;
	default:
		roleId = '1054977263713648792';
	}

	return roleId;
}

exports.resolveRoleId = resolveRoleId;

/**
 *
 * @param { string } dutyType
 * @param { GuildMember } member
 */
async function setDutyRole(dutyType, member) {
	let roleId;

	await member.roles.remove([config.roles.offDutyRoleId, config.roles.offlineRoleId, config.roles.onDutyRoleId]);

	switch (dutyType) {
	case 'onDuty':
		roleId = config.roles.onDutyRoleId;
		break;
	case 'offDuty':
		roleId = config.roles.offDutyRoleId;
		break;
	case 'offline':
		roleId = config.roles.offlineRoleId;
		break;
	}

	setTimeout(function() {
		member.roles.add(roleId, dutyType);
	}, 1000);
}

exports.setDutyRole = setDutyRole;
