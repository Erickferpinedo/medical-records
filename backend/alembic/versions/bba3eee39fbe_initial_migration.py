"""Initial migration

Revision ID: bba3eee39fbe
Revises: 7b6b129c215a
Create Date: 2024-09-29 09:35:23.616166

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bba3eee39fbe'
down_revision: Union[str, None] = '7b6b129c215a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('medicalhistory', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'medicalhistory', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'medicalhistory', type_='foreignkey')
    op.drop_column('medicalhistory', 'user_id')
    # ### end Alembic commands ###
